from flask import Blueprint, render_template
from flask_login import login_required, current_user
from .models import User

views = Blueprint('views', __name__)
#render home page with place holder html file using Jinja
@views.route('/')
@login_required
def home():
    return render_template("home.html", user=current_user)

@views.route('/profile/user/<int:user_id>')
@login_required
def profile(user_id):
    user = User.query.get_or_404(user_id)
    return render_template("profile.html", user=current_user)