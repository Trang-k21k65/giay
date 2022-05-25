from flask import session, render_template, redirect, url_for, Blueprint
from .service import get_new_product_service, get_best_selling_service

home = Blueprint('home', __name__)


# view
@home.route("/", methods=['GET'])
def homepage():
    if 'user' in session:
        return render_template('Home_new.html')
    else:
        return redirect(url_for('auth.login'))


@home.route('/home/<classify>', methods=['GET'])
def get_products_html(classify):
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return render_template("product/Category.html", classify=classify)


@home.route('/search/<name>', methods=['GET'])
def get_search_html(name):
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return render_template("product/Category.html", name=name)


# get
@home.route('/home/new-product', methods=["GET"])
def get_new_product():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return get_new_product_service()


@home.route('/home/best-selling', methods=["GET"])
def get_best_selling():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    return get_best_selling_service()
