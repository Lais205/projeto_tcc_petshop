from flask import Blueprint, request, redirect, url_for, flash
from flask_login import login_user, logout_user, login_required, current_user
from app.models import User
from app import db
from app.frontend import serve_frontend

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    
    if request.method == 'POST':
        email_or_phone = request.form.get('email_or_phone')
        password = request.form.get('password')
        
        user = User.query.filter(
            (User.email == email_or_phone) | (User.phone == email_or_phone)
        ).first()
        
        if user and user.check_password(password):
            login_user(user)
            flash('Login realizado com sucesso!', 'success')
            return redirect(url_for('main.home'))
        else:
            flash('Email/telefone ou senha incorretos.', 'error')
            return redirect(url_for('auth.login'))
    
    return serve_frontend()

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    
    if request.method == 'POST':
        email_or_phone = request.form.get('email_or_phone')
        full_name = request.form.get('full_name')
        password = request.form.get('password')
        
        if '@' in email_or_phone:
            user = User.query.filter_by(email=email_or_phone).first()
            if user:
                flash('Este email já está cadastrado.', 'error')
                return redirect(url_for('auth.register'))
            new_user = User(email=email_or_phone, full_name=full_name)
        else:
            user = User.query.filter_by(phone=email_or_phone).first()
            if user:
                flash('Este telefone já está cadastrado.', 'error')
                return redirect(url_for('auth.register'))
            new_user = User(phone=email_or_phone, full_name=full_name)
        
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        
        flash('Cadastro realizado com sucesso! Faça login.', 'success')
        return redirect(url_for('auth.login'))
    
    return serve_frontend()

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Você saiu da conta.', 'info')
    return redirect(url_for('main.home'))
