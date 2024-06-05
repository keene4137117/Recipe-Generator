from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager

db = SQLAlchemy()
DB_NAME = "database.db"
def create_app():
    app = Flask(__name__)
    #sign session cookies
    app.config['SECRET_KEY'] = 'sdfslwfowmdkfl'
    #create data base and use on this app
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)
    
    
    from .views import views
    from .auth import auth
    from .base import base
    #add to base URL:
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(base, url_prefix='/')
    
    from .models import User, Note
    #check if database exists
    if not path.exists('website/' + DB_NAME):
        #create database on this app if does not exist:
        with app.app_context():
            db.create_all()
            
    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))
    return app