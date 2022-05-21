from flask import Blueprint, redirect, session, url_for, render_template
from .service import get_product_in_cart_service, add_product_to_cart_service, get_order_by_status_service, \
    update_product_in_cart_service, add_order_service, delete_product_in_cart_service

cart = Blueprint("cart", __name__)


# view
@cart.route("/cart/products", methods=["GET"])
def get_cart():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return render_template('Payment.html')


@cart.route("/success", methods=["GET"])
def get_success():
    return render_template('Success.html')


@cart.route("/order_detail", methods=["GET"])
def get_order_details():
    return render_template('Order_detail.html')


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


# change
@cart.route('/cart/update', methods=['POST'])
def update_product_in_cart():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    msg = update_product_in_cart_service()
    return get_product_in_cart_service(), msg


@cart.route('/cart/delete', methods=['POST'])
def delete_product_in_cart():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    msg = delete_product_in_cart_service()
    return get_product_in_cart_service(), msg


# Add
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
