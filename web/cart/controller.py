from flask import Blueprint, redirect, session, url_for, render_template, request
from .service import get_product_in_cart_service, add_product_to_cart_service

cart = Blueprint("cart", __name__)


@cart.route("/cart/products", methods=["GET"])
def get_cart():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return render_template('Payment.html')


@cart.route("/cart", methods=["GET"])
def get_product_in_cart():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return get_product_in_cart_service()


@cart.route('/addcart', methods=['POST'])
def add_product_to_cart():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return add_product_to_cart_service()
