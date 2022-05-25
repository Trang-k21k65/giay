from datetime import datetime

from flask import session
from flask_admin.contrib.sqla import ModelView
from flask_admin.model import typefmt

from web.extensions.models import User, Order, Orderdetail, Product, Size, Classify, db
from web.extensions.__init__ import admin


# thay đổi dạng hiển thị của date
def date_format(view, value):
    return value.strftime('%d-%m-%Y')


MY_DEFAULT_FORMATTERS = dict(typefmt.BASE_FORMATTERS)
MY_DEFAULT_FORMATTERS.update({
    type(None): typefmt.null_formatter,
    datetime: date_format
})


class AdminView(ModelView):

    def is_accessible(self):
        return 'admin' in session

    page_size = 20
    column_display_pk = True
    create_modal = True
    edit_modal = True
    column_type_formatters = MY_DEFAULT_FORMATTERS


class UserView(AdminView):
    column_searchable_list = ('username', 'fullname', 'admin_role')
    column_exclude_list = ('password', 'avatar')  # column bị bỏ
    form_excluded_columns = ('orders', 'avatar')


admin.add_view(UserView(User, db.session))


class OrderView(AdminView):
    column_list = ('id', 'user', 'status', 'orderDate', 'shippedDate')
    column_searchable_list = ('status', 'user.username')
    form_excluded_columns = ('order_details',)
    can_create = False
    can_delete = False
    column_default_sort = ('user_id', True)
    form_choices = {
        'status': [('Đang mua', 'Đang mua'), ('Đặt hàng', 'Đặt hàng'), ('Xác nhận', 'Xác nhận'),
                   ('Đang giao', 'Đang giao'), ('Đã nhận', 'Đã nhận')]
    }


admin.add_view(OrderView(Order, db.session))


class OrderdetailView(AdminView):
    column_list = ('order', 'product', 'size', 'quantityOrdered', 'sellPrice')
    column_labels = dict(order='Order', quantityOrdered='Quantity', sellPrice='Price Each')  # thay đổi nhãn của column
    can_edit = False
    can_create = False
    can_delete = False
    column_searchable_list = ('order_id', 'order.status', 'product.name')


admin.add_view(OrderdetailView(Orderdetail, db.session))


class ProductView(AdminView):
    column_searchable_list = ('name', 'brand')
    page_size = 10
    form_columns = ('id', 'name', 'brand', 'buyPrice', 'sellPrice', 'tag',
                    'importDate', 'description', 'image', 'consume', 'active')
    form_widget_args = {
        'description': {'style': 'height: 180px'},
        'image': {'style': 'height: 100px'}
    }


    def description_formatter(view, context, Product, name):
        return Product.description[:30] + '...'

    column_formatters = {
        'description': description_formatter,
    }


admin.add_view(ProductView(Product, db.session))


class SizeView(AdminView):
    column_list = ('product', 'size', 'quantityInStock')
    form_columns = column_list
    column_searchable_list = ('product.name',)
    form_choices = {
        'size': [(36, 36), (37, 37), (38, 38), (39, 39), (40, 40), (41, 41), (42, 42)]
    }


admin.add_view(SizeView(Size, db.session))


class ClassifyView(AdminView):
    column_list = ('product', 'id')
    column_labels = dict(id='Classify')
    form_columns = column_list
    column_searchable_list = ('product.name',)
    form_choices = {
        'id': [('Man', 'Man'), ('Woman', 'Woman'), ('Sport', 'Sport'), ('Fashion', 'Fashion')]
    }


admin.add_view(ClassifyView(Classify, db.session))
