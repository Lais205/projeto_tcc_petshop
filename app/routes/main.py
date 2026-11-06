from flask import Blueprint, get_flashed_messages, jsonify, request
from flask_login import login_required, current_user
from app import db
from app.models import Product

from app.frontend import serve_frontend

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def home():
    return serve_frontend()

@main_bp.route('/dashboard')
@login_required
def dashboard():
    return serve_frontend()

@main_bp.route('/api/session')
def session_info():
    user = None
    if current_user.is_authenticated:
        user = {
            'full_name': current_user.full_name,
        }

    return jsonify({
        'authenticated': current_user.is_authenticated,
        'user': user,
        'messages': get_flashed_messages(with_categories=True),
    })

@main_bp.route('/<path:path>')
def frontend_fallback(path):
    return serve_frontend(path)

@main_bp.route('/api/products')
def get_products():
    featured = request.args.get('featured', 'false').lower() == 'true'
    category = request.args.get('category')
    search = request.args.get('search')
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    sort_by = request.args.get('sort_by', 'name')
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 12, type=int)

    query = Product.query

    if featured:
        query = query.filter_by(featured=True)

    if category and category != 'Todos' and category != 'Ofertas':
        query = query.filter_by(category=category)

    if category == 'Ofertas':
        query = query.filter(Product.badge.isnot(None))

    if search:
        search_term = f'%{search.lower()}%'
        query = query.filter(
            db.or_(
                Product.name.ilike(search_term),
                Product.category.ilike(search_term),
                Product.keywords.ilike(search_term)
            )
        )

    if min_price is not None:
        query = query.filter(Product.price_numeric >= min_price)

    if max_price is not None:
        query = query.filter(Product.price_numeric <= max_price)

    if sort_by == 'price_asc':
        query = query.order_by(Product.price_numeric.asc())
    elif sort_by == 'price_desc':
        query = query.order_by(Product.price_numeric.desc())
    elif sort_by == 'rating':
        query = query.order_by(Product.rating.desc())
    else:
        query = query.order_by(Product.name.asc())

    total = query.count()
    products = query.offset((page - 1) * per_page).limit(per_page).all()
    total_pages = (total + per_page - 1) // per_page

    return jsonify({
        'products': [{
            'id': p.id,
            'name': p.name,
            'category': p.category,
            'rating': p.rating,
            'price': p.price,
            'oldPrice': p.old_price,
            'badge': p.badge,
            'image': p.image,
            'keywords': p.keywords,
            'featured': p.featured
        } for p in products],
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total': total,
            'total_pages': total_pages
        }
    })

@main_bp.route('/api/categories')
def get_categories():
    categories = db.session.query(Product.category).distinct().all()
    category_list = [cat[0] for cat in categories]
    return jsonify(category_list)

@main_bp.route('/api/products/<int:product_id>')
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify({
        'id': product.id,
        'name': product.name,
        'category': product.category,
        'rating': product.rating,
        'price': product.price,
        'oldPrice': product.old_price,
        'badge': product.badge,
        'image': product.image,
        'keywords': product.keywords,
        'featured': product.featured
    })
