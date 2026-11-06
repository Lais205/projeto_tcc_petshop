from flask import Blueprint, jsonify, request, session
from flask_login import current_user
from app import db
from app.models import CartItem, Product
import uuid

cart_bp = Blueprint('cart', __name__)

def get_cart_identifier():
    if current_user.is_authenticated:
        return current_user.id, 'user'
    else:
        if 'cart_session_id' not in session:
            session['cart_session_id'] = str(uuid.uuid4())
        return session['cart_session_id'], 'session'

@cart_bp.route('/api/cart', methods=['GET'])
def get_cart():
    cart_id, cart_type = get_cart_identifier()
    
    if cart_type == 'user':
        cart_items = CartItem.query.filter_by(user_id=cart_id).all()
    else:
        cart_items = CartItem.query.filter_by(session_id=cart_id).all()
    
    items = []
    total = 0
    for item in cart_items:
        price = float(item.product.price.replace('.', '').replace(',', '.'))
        item_total = price * item.quantity
        total += item_total
        
        items.append({
            'id': item.id,
            'product_id': item.product.id,
            'name': item.product.name,
            'price': item.product.price,
            'image': item.product.image,
            'quantity': item.quantity,
            'item_total': item_total
        })
    
    return jsonify({
        'items': items,
        'total': total,
        'count': sum(item['quantity'] for item in items)
    })

@cart_bp.route('/api/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    
    if not product_id:
        return jsonify({'error': 'product_id é obrigatório'}), 400
    
    product = Product.query.get_or_404(product_id)
    cart_id, cart_type = get_cart_identifier()
    
    if cart_type == 'user':
        existing_item = CartItem.query.filter_by(
            user_id=cart_id,
            product_id=product_id
        ).first()
    else:
        existing_item = CartItem.query.filter_by(
            session_id=cart_id,
            product_id=product_id
        ).first()
    
    if existing_item:
        existing_item.quantity += quantity
    else:
        if cart_type == 'user':
            new_item = CartItem(
                user_id=cart_id,
                product_id=product_id,
                quantity=quantity
            )
        else:
            new_item = CartItem(
                session_id=cart_id,
                product_id=product_id,
                quantity=quantity
            )
        db.session.add(new_item)
    
    db.session.commit()
    
    return jsonify({'success': True})

@cart_bp.route('/api/cart/<int:item_id>', methods=['PUT'])
def update_cart_item(item_id):
    data = request.get_json()
    quantity = data.get('quantity', 1)
    
    if quantity < 1:
        return jsonify({'error': 'quantidade deve ser pelo menos 1'}), 400
    
    cart_id, cart_type = get_cart_identifier()
    
    if cart_type == 'user':
        item = CartItem.query.filter_by(id=item_id, user_id=cart_id).first_or_404()
    else:
        item = CartItem.query.filter_by(id=item_id, session_id=cart_id).first_or_404()
    
    item.quantity = quantity
    db.session.commit()
    
    return jsonify({'success': True})

@cart_bp.route('/api/cart/<int:item_id>', methods=['DELETE'])
def remove_cart_item(item_id):
    cart_id, cart_type = get_cart_identifier()
    
    if cart_type == 'user':
        item = CartItem.query.filter_by(id=item_id, user_id=cart_id).first_or_404()
    else:
        item = CartItem.query.filter_by(id=item_id, session_id=cart_id).first_or_404()
    
    db.session.delete(item)
    db.session.commit()
    
    return jsonify({'success': True})

@cart_bp.route('/api/cart', methods=['DELETE'])
def clear_cart():
    cart_id, cart_type = get_cart_identifier()
    
    if cart_type == 'user':
        CartItem.query.filter_by(user_id=cart_id).delete()
    else:
        CartItem.query.filter_by(session_id=cart_id).delete()
    
    db.session.commit()
    
    return jsonify({'success': True})
