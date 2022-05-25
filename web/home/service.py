from web.extensions.models import Product
from web.product.service import products_schema


def get_new_product_service():
    product = Product.query.order_by(Product.importDate.desc()).limit(8).all()
    if product:
        return products_schema.jsonify(product)
    else:
        return "Error at gacha"


def get_best_selling_service():
    product = Product.query.order_by(Product.consume.desc()).limit(8).all()
    if product:
        return products_schema.jsonify(product)
    else:
        return "Error at gacha"

