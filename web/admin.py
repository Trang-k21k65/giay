from datetime import datetime

from flask import session
from flask_admin.contrib.sqla import ModelView
from flask_admin.model import typefmt
from wtforms.validators import AnyOf

from web.models import User, Order, Orderdetail, Product, Size, Classify, db
from .extensions import admin


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
    form_columns = ('id', 'name', 'brand', 'buyPrice', 'sellPrice', 'tag',
                    'importDate', 'description', 'image', 'consume', 'active')


admin.add_view(ProductView(Product, db.session))


class SizeView(AdminView):
    column_list = ('product', 'size', 'quantityInStock')
    form_columns = column_list
    column_searchable_list = ('product.name',)


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
