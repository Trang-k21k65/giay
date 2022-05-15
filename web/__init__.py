from flask import Flask
import os
from web.models import db
from web.admin import admin
from web.ma import ma


def create_db(app):
    if not os.path.exists("web/shoes.db"):
        db.create_all(app=app)
        print("CREATED DATABASE")


def create_app(config_file='config.py'):
    app = Flask(__name__)
    app.config.from_pyfile(config_file)

    from .auth.controller import auth
    app.register_blueprint(auth)

    from .home.controller import home
    app.register_blueprint(home)

    from .product.controller import product
    app.register_blueprint(product, name='')

    from .cart.controller import cart
    app.register_blueprint(cart)

    db.init_app(app)
    create_db(app)
    admin.init_app(app)
    ma.init_app(app)

    return app
