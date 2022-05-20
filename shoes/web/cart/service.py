from flask import session, request, redirect, flash, url_for, render_template

from ..models import Orderdetail, Product, Size, Order, db
from ..ma import OrderdetailsSchema, OrderSchema

orderdetails_schema = OrderdetailsSchema(many=True)
orders_schema = OrderSchema(many=True)


def get_product_in_cart_service():
    subquery = db.session.query(Order.id).filter(Order.user_id == session['user'], Order.status == 'Đang mua')
    orderdetails = Orderdetail.query.filter(Orderdetail.order_id.in_(subquery)).all()
    if orderdetails:
        return orderdetails_schema.jsonify(orderdetails)
    else:
        return "Dont have any product in your cart. Wanna find something?"


def get_order_by_status_service(status):
    orders = Order.query.filter(Order.user_id == session['user'], Order.status == status).all()
    if orders:
        return orders_schema.jsonify(orders)
    else:
        return "Don't have any order"


def add_product_to_cart_service():
    if request.method == 'POST':
        size = int(request.form.get('size'))
        qty = int(request.form.get('qty'))
        product_id = request.form.get('product_id')
        order = Order.query.filter(Order.user_id == session['user'], Order.status == 'Đang mua').first()
        if order is None:
            order = Order(user_id=session['user'])
            db.session.add(order)
            db.session.commit()
        order_detail = db.session.query(Orderdetail). \
            filter(Orderdetail.size == size, Orderdetail.order_id == order.id,
                   Orderdetail.product_id == product_id).first()
        if order_detail:
            product_size = Size.query.filter(Size.product_id == product_id, Size.size == size).first()
            if order_detail.quantityOrdered == product_size.quantityInStock:
                return 'Số lượng sản phẩm này trong giỏ hàng của bạn đã đạt max.'
            elif order_detail.quantityOrdered + qty <= product_size.quantityInStock:
                order_detail.quantityOrdered += qty
            else:
                order_detail.quantityOrdered = product_size.quantityInStock
        else:
            order_detail = Orderdetail(order_id=order.id, product_id=product_id, size=size, quantityOrdered=qty)
            product = Product.query.filter(Product.id == product_id).first()
            order_detail.sellPrice = product.sellPrice
        db.session.add(order_detail)
        db.session.commit()
        return 'Success'


def update_product_in_cart_service():
    if request.method == 'POST':
        size = int(request.form.get('size'))
        qty = int(request.form.get('qty'))
        product_id = request.form.get('product_id')
        order = Order.query.filter(Order.user_id == session['user'], Order.status == 'Đang mua').first()
        order_detail = db.session.query(Orderdetail). \
            filter(Orderdetail.size == size, Orderdetail.order_id == order.id,
                   Orderdetail.product_id == product_id).first()
        if qty == 0:
            db.session.delete(order_detail)
        else:
            order_detail.quantityOrdered = qty
        db.session.commit()
    return {"no": "snjdnd"}