from flask import Blueprint, get_flashed_messages, jsonify
from flask_login import login_required, current_user

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
