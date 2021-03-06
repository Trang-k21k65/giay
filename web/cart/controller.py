from flask import Blueprint, redirect, session, url_for, render_template
from .service import get_product_in_cart_service, add_product_to_cart_service, get_order_by_status_service, \
    update_product_in_cart_service, add_order_service, delete_product_in_cart_service, get_user_info_service

cart = Blueprint("cart", __name__)


# view
@cart.route("/cart/products", methods=["GET"])
def get_cart():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return render_template('cart/Payment.html')


@cart.route("/success", methods=["GET"])
def get_success():
    return render_template('cart/Success.html')


@cart.route("/order_detail", methods=["GET"])
def get_order_details():
    return render_template('cart/Order_detail.html')


# get
@cart.route("/cart", methods=["GET"])
def get_product_in_cart():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return get_product_in_cart_service()


@cart.route('/orders/<status>', methods=['GET'])
def get_order_by_status(status):
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return get_order_by_status_service(status)


@cart.route('/cart/user-info', methods=['GET', 'POST'])
def get_user_info():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return get_user_info_service()


# change
@cart.route('/cart/update', methods=['POST'])
def update_product_in_cart():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return update_product_in_cart_service()


@cart.route('/cart/delete', methods=['POST'])
def delete_product_in_cart():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return delete_product_in_cart_service()


# add
@cart.route('/addcart', methods=['POST'])
def add_product_to_cart():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return add_product_to_cart_service()


@cart.route('/cart/order', methods=['POST'])
def add_order():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return add_order_service()
