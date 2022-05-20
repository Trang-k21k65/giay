import os
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.environ.get("KEY")
SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URI")
SQLALCHEMY_TRACK_MODIFICATIONS = True
