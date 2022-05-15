from flask import session, render_template, redirect, url_for, Blueprint
from .service import get_new_product_service, get_best_selling_service

home = Blueprint('home', __name__)


@home.route("/", methods=['GET'])
def homepage():
    if 'user' in session:
        return render_template('Home_new.html')
    else:
        return redirect(url_for('auth.login'))


@home.route('/home/<classify>', methods=['GET'])
def get_products_html(classify):
    return render_template("Category.html", classify=classify)


@home.route('/search/<name>', methods=['GET'])
def get_search_html(name):
    return render_template("Category.html", name=name)


@home.route('/home/new-product', methods=["GET"])
def get_new_product():
    return get_new_product_service()


@home.route('/home/best-selling', methods=["GET"])
def get_best_selling():
    return get_best_selling_service()
