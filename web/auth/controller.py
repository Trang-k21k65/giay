from flask import Blueprint
from .service import user_service, signup_service, login_service, logout_service

auth = Blueprint('auth', __name__)


@auth.route('/signup', methods=["POST", 'GET'])
def signup():
    return signup_service()


@auth.route('/login', methods=["POST", "GET"])
def login():
    return login_service()


@auth.route('/logout')
def logout():
    return logout_service()


@auth.route('/user', methods=["POST", "GET"])
def user():
    return user_service()
