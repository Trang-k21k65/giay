from flask import Blueprint, render_template, session, redirect, url_for
from .service import get_products_service, get_products_by_classify_service, \
    get_products_by_name_service, get_products_by_brand_service, get_product_by_id_service


product = Blueprint("product", __name__)


@product.route("/products", methods=["GET"])
def get_products():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return get_products_service()


@product.route("/products/classify/<classify>", methods=["GET"])
def get_products_by_classify(classify):
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return get_products_by_classify_service(classify)


@product.route("/products/search/<name>", methods=['GET'])
def get_products_by_name(name):
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return get_products_by_name_service(name)


@product.route("/products/brand/<brand>", methods=['GET'])
def get_products_by_brand(brand):
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return get_products_by_brand_service(brand)


# Get Single Product
@product.route('/products/details/<id>', methods=['GET'])
def get_product_by_id(id):
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return get_product_by_id_service(id)


@product.route('/products/<id>', methods=['GET'])
def get_product_html(id):
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return render_template("Product.html", id=id)


