from web.extensions.__init__ import ma
from web.extensions.models import Product, Size, User, Order, Orderdetail


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User


class SizeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Size


class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Product

    sizes = ma.Nested(SizeSchema, many=True)


class OrderdetailSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Orderdetail
        include_fk = True

    product = ma.Nested(ProductSchema)


class OrderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Order

    order_details = ma.Nested(OrderdetailSchema, many=True)



