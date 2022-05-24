import datetime
from flask import session, request, redirect, flash, url_for, render_template

from ..models import Orderdetail, Product, Size, Order, User, db
from ..ma import OrderdetailsSchema, OrderSchema, UserSchema

orderdetails_schema = OrderdetailsSchema(many=True)
orders_schema = OrderSchema(many=True)


# lấy sp trong giỏ hàng đồng thời kiểm tra số lg sp trong kho có đáp ứng order ban đầu không.
# nếu qtyInStock = 0 --> sp hết hàng
def get_product_in_cart_service():
    order = Order.query.filter(Order.user_id == session['user'], Order.status == 'Đang mua').first()
    if order:
        for od in order.order_details:
            size = Size.query.filter(Size.product_id == od.product_id, Size.size == od.size).first()
            if size.quantityInStock < od.quantityOrdered:
                od.quantityOrdered = size.quantityInStock
        db.session.commit()
        return orderdetails_schema.jsonify(order.order_details)
    else:
        return "Dont have any product in your cart. Wanna find something?"


# Lấy ra các đơn đang giao, đã giao
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
        od = [od for od in order.order_details if (od.product_id == product_id and od.size == size)]
        if od:
            order_detail = od[0]
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


# update sp trong giỏ hàng
def update_product_in_cart_service():
    if request.method == 'POST':
        size = int(request.form.get('size'))
        qty = int(request.form.get('qty'))
        product_id = request.form.get('product_id')
        order = Order.query.filter(Order.user_id == session['user'], Order.status == 'Đang mua').first()
        order_detail = [od for od in order.order_details if (od.product_id == product_id and od.size == size)]
        if order_detail:
            if qty == 0:
                db.session.delete(order_detail[0])
                db.session.commit()
                return {"msg": "delete success"}
                #return "delete success"
            else:
                order_detail[0].quantityOrdered = qty
                db.session.commit()
                return {"msg": "update success"}
                #return "update success"
        else:
            return {"msg": "product not have in cart"}
            #return "product not have in cart"

# xóa sp trong giỏ hàng
def delete_product_in_cart_service():
    if request.method == 'POST':
        size = int(request.form.get('size'))
        product_id = request.form.get('product_id')
        order = Order.query.filter(Order.user_id == session['user'], Order.status == 'Đang mua').first()
        order_detail = [od for od in order.order_details if (od.product_id == product_id and od.size == size)]
        if order_detail:
            db.session.delete(order_detail[0])
            db.session.commit()
            return {"msg": "delete success"}
        else:
            return {"msg": "product not have in cart"}


# đặt hàng
def add_order_service():
    if request.method == 'POST':
        id = int(request.form.get('order_id'))
        order = Order.query.filter(Order.user_id == session['user'], Order.id == id, Order.status == 'Đang mua').first()
        if order:
            if order.order_details:
                order.status = 'Đặt hàng'
                order.orderDate = datetime.datetime.now()  # .strftime("%A %d. %B %Y")
                order.shippedDate = (datetime.datetime.now() + datetime.timedelta(days=9))  # .strftime("%A %d. %B %Y")
                for od in order.order_details:
                    size = Size.query.filter(Size.product_id == od.product_id, Size.size == od.size).first()
                    size.quantityInStock -= od.quantityOrdered
                db.session.commit()
                return {"msg:": "order success"}
            else:
                return {"msg:": "don't have any product in your cart"}
        else:
            return {"msg": "this order don't have in your orders"}

# user info
def user_info_service():
    user = User.query.filter(User.id == session['user']).first()
    if request.method == "POST":
        user.fullname = request.form.get('fullname')
        user.address = request.form.get('address')
        user.phone = request.form.get('phone')
        db.session.commit()
        return {"msg" : "update user info success"}
    if request.method == 'GET':
        return UserSchema().jsonify(user)