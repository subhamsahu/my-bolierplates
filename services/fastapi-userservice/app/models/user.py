from email.policy import default
from mongoengine import *
from app.core.settings import DATABASE
from enum import Enum, unique
from datetime import datetime


class ModeOfRegisteration(str, Enum):
    EMAIL = 'email'
    GOOGLE = 'gmail'


class User(Document):
    email = StringField(unique=True, max_length=200, required=True)
    name = StringField(max_length=200, required=True)
    phone = StringField(unique=True, max_length=12, required=True)
    password = StringField(max_length=200, required=False)
    is_seller = BooleanField(required=True, default=False)
    is_customer = BooleanField(required=True, default=False)
    is_deliverypartner = BooleanField(required=True, default=False)
    is_admin = BooleanField(required=True, default=False)
    is_executive = BooleanField(required=True, default=False)
    is_active = BooleanField(default=False)
    is_verified = BooleanField(default=False)
    date_created = DateTimeField(default=datetime.utcnow)
    date_modified = DateTimeField(default=datetime.utcnow)
    meta = {
        'collection': DATABASE['mongodb']['collections']['user_collection_name'],
        'auto_create_index': True,
        'indexes': [
            'email','phone'
        ]
    }

