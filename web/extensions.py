from flask_admin import Admin
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


db = SQLAlchemy()
admin = Admin(name='', template_mode='bootstrap4')
ma = Marshmallow()
