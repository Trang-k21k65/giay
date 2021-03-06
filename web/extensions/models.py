from sqlalchemy import Column, Integer, String, ForeignKey, Text, Boolean, DateTime
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
from web.extensions.__init__ import db


class User(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), nullable=False, unique=True)
    password = Column(String(150), nullable=False)
    avatar = Column(Text)
    admin_role = Column(Boolean, default=False)
    fullname = Column(String(50))
    phone = Column(String(15))
    address = Column(Text)
    orders = relationship('Order', backref='user', lazy=True)

    def __str__(self):
        return self.username

    def set_psw(self, password):
        self.password = generate_password_hash(password=password)

    def check_psw(self, password):
        return check_password_hash(self.password, password)


class Order(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    status = Column(String(20), default='Đang mua')  # Gồm: Đang mua, Đặt hàng, Xác nhận, Đang giao, Đã nhận
    user_id = Column(Integer, ForeignKey(User.id), nullable=False)
    orderDate = Column(DateTime)
    shippedDate = Column(DateTime)
    order_details = relationship('Orderdetail', backref='order', lazy=True)

    def __str__(self):
        return f'order {self.id} - ' + self.status


class Product(db.Model):
    id = Column(String(15), primary_key=True)
    name = Column(String(50), nullable=False)
    brand = Column(String(30), nullable=False)
    buyPrice = Column(Integer, nullable=False)
    sellPrice = Column(Integer, nullable=False)
    tag = Column(Integer)
    importDate = Column(DateTime)
    description = Column(Text)
    image = Column(Text)
    consume = Column(Integer, default=3)  # luong tieu thu
    active = Column(Boolean, default=True)  # hang co con kinh doanh nua hay khong
    order_details = relationship('Orderdetail', backref='product', lazy=True)
    classifies = relationship('Classify', backref='product', lazy=True)
    sizes = relationship('Size', backref='product', lazy=True)

    def __str__(self):
        return self.name


class Orderdetail(db.Model):
    order_id = Column(Integer, ForeignKey(Order.id), primary_key=True)
    product_id = Column(String(15), ForeignKey(Product.id), primary_key=True)
    size = Column(Integer, primary_key=True)
    comment = Column(String(100))
    sellPrice = Column(Integer)  # bỏ cái này đi
    quantityOrdered = Column(Integer, nullable=False)

    def __str__(self):
        return f'{self.order_id} - ' + self.product_id + f' - {self.size} - {self.quantityOrdered}'


class Classify(db.Model):
    product_id = Column(String(15), ForeignKey(Product.id), primary_key=True)
    id = Column(String(10), primary_key=True)

    def __str__(self):
        return f'{self.id}'


class Size(db.Model):
    product_id = Column(String(15), ForeignKey(Product.id), primary_key=True)
    size = Column(Integer, primary_key=True)
    quantityInStock = Column(Integer, default=15)

    def __str__(self):
        return f'{self.size}' + "-" + f'{self.quantityInStock}'
