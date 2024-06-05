from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User, db
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
auth = Blueprint('auth', __name__)
#render "login", "logout" and "sign_up" pages with place holder html files with Jinja
@auth.route('/login', methods=['GET', 'POST'])
def login():
    data = request.form
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user:
        if not check_password_hash(user.password, password):
            flash('Invalid email or password', category='error')
        else:
            login_user(user, remember=True)
            return redirect(url_for('views.home'))
    return render_template("login.html", user=current_user)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == "POST":
        email = request.form.get('email')
        firstName = request.form.get('firstName')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')
        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email already exists', category='error')
        #use flash to display error messages
        elif len(email) < 4:
            flash('email must be greater than 3 characters.', category='error')
        elif len(firstName) < 2:
            flash('first name must be greater than 1 character.', category='error')
        elif password1 != password2:
            flash('passwords don\'t match.', category='error')
        elif len(password1) < 7:
            flash('password must be at least 7 characters.', category='error')
        else:
            #add user to database, use hashing function to secure user password
            new_user = User(email=email, firstName=firstName, password=generate_password_hash(password1))
            db.session.add(new_user)
            db.session.commit()
            login_user(user, remember=True)
            flash('account created!', category='success')
            #redirect to home page if sign up completed successfully
            return redirect(url_for('views.home'))
    return render_template("sign_up.html", user=current_user)