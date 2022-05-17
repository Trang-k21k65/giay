from flask import session
from flask_admin.contrib import sqla
from flask_admin.contrib.sqla import ModelView
from flask_admin.form import Select2Widget

from web.models import User, Order, Orderdetail, Product, Size, Classify, db
from .extensions import admin


class AdminView(ModelView):
    def __init__(self, model, *args, **kwargs):
        self.column_list = [c.key for c in model.__table__.columns]
        self.form_columns = self.column_list
        super(AdminView, self).__init__(model, *args, **kwargs)

    def is_accessible(self):
        return 'admin' in session

    page_size = 10
    column_display_pk = True


class ClassifyView(AdminView):
    column_hide_backrefs = False
    form_extra_fields = {
        'pr_id': sqla.fields.QuerySelectField(
            label='pr_id',
            query_factory=lambda: db.session.query(Product.id).all(),
            widget=Select2Widget()
        )
    }
    # get_pk_value(Product)
    column_list = ('pr_id', 'id')


admin.add_view(AdminView(User, db.session))
admin.add_view(AdminView(Order, db.session))
admin.add_view(AdminView(Product, db.session))
admin.add_view(AdminView(Orderdetail, db.session))
admin.add_view(AdminView(Size, db.session))
admin.add_view(ClassifyView(Classify, db.session))
