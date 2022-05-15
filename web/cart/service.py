from flask import session, request, redirect, flash, url_for, render_template

from ..models import Orderdetail, Product, Size, Order, db
from ..ma import OrderdetailsSchema

orderdetails_schema = OrderdetailsSchema(many=True)


def get_product_in_cart_service():
    '''
    SELECT * FROM Orderdetail WHERE order_id IN
        (SELECT order_id FROM Order WHERE user_id = session['user'] AND status = 'Đang mua')
    '''
    subquery = db.session.query(Order.id).filter(Order.user_id == session['user'], Order.status == 'Đang mua')
    orderdetails = Orderdetail.query.filter(Orderdetail.order_id.in_(subquery)).all()
    if orderdetails:
        return orderdetails_schema.jsonify(orderdetails)
    else:
        return "Dont have any product in your cart. Wanna find something?"


def add_product_to_cart_service():
    if request.method == 'POST':
        size = request.form.get('size')
        if size is None:
            flash('Please select size.', category='error')
        else:
            size = int(size)
            qty = int(request.form.get('qty'))
            product_id = request.form.get('product_id')
            order = Order.query.filter(Order.user_id == session['user'], Order.status == 'Đang mua').first()
            if order is None:
                order = Order(user_id=session['user'])
                db.session.add(order)
                db.session.commit()
            order_detail = db.session.query(Orderdetail).\
                filter(Orderdetail.size == size, Orderdetail.order_id == order.id, Orderdetail.product_id == product_id).first()
            if order_detail:
                product_size = Size.query.filter(Size.product_id == product_id, Size.size == size).first()
                if order_detail.quantityOrdered == product_size.quantityInStock:
                    flash('Số lượng sản phẩm này trong giỏ hàng của bạn đã đạt max.')
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
            flash('Sản phẩm đã được thêm vào giỏ hàng.')
        '''
                if request.form.get('two_buttons') == 'add':
            ans = 'add'
        elif request.form.get('two_buttons') == 'mua':
            ans = 'mua'
        return ans
        '''
    return "dsf"


def del_product_in_cart_service():
    pass