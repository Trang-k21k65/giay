from web.extensions.models import Product, Classify
from web.extensions.ma import ProductSchema

products_schema = ProductSchema(many=True)


def get_products_service():
    products = Product.query.all()
    if products:
        return products_schema.jsonify(products)
    else:
        return "Don't have any product"


def get_products_by_classify_service(classify):
    products = Product.query.filter(Product.classifies.any(Classify.id == classify)).all()
    if products:
        return products_schema.jsonify(products)
    else:
        return "Don't have any product in " + classify


def get_products_by_name_service(name):
    products = Product.query.filter(Product.name.contains(name)).all()
    if products:
        return products_schema.jsonify(products)
    else:
        return "Don't have any product have name '%s' " % name


def get_products_by_brand_service(brand):
    products = Product.query.filter(Product.brand == brand).all()
    if products:
        return products_schema.jsonify(products)
    else:
        return "Don't have any product in brand " + brand


def get_product_by_id_service(id):
    product = Product.query.filter(Product.id == id)
    if product:
        return products_schema.jsonify(product)
    else:
        return "Dont have this product"

