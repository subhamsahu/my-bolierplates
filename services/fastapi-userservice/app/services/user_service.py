import re
import mongoengine
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from fastapi import status, HTTPException

import logging

from app.db.repositories.user import UserRepository
from app.schema.user_schema import UserOut, UserSchema, UserOTPVerificationSchema, AdminUserOut
from app.models.user import User
from app.core.password import get_password_hash, verify_hash_password
from app.exceptions.app_exceptions import AppException
from app.schema.response_schema import ResponseSchema
from app.core import oauth2
from app.services.sendgrid_service import Sendgrid

sendgrid_service = Sendgrid()

class BaseUserService:
    def __init__(self):
        self._user_repository = UserRepository()

    def verify_user_email_from_token(self, token: str) -> ResponseSchema:
        try:
            user = oauth2.get_current_user(token)
            if not user.is_verified:
                user.is_verified = True
                user.is_active = True
                user.save()
            return ResponseSchema(f"Email {user.email}  verified")
        except mongoengine.errors.DoesNotExist as e:
            return ResponseSchema(AppException(str(e)))
        except Exception as e:
            return ResponseSchema(AppException(str(e)))

    def verify_jwt_token(self, token: str) -> ResponseSchema:
        try:
            credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                                  detail=f"Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
            token_data = oauth2.verify_access_token(
                token, credentials_exception)
            if token_data:
                return ResponseSchema("Valid AccessToken")
        except Exception as e:
            return ResponseSchema(AppException(str(e)))
        
    def get_current_active_user(self, token: str) -> ResponseSchema:
        try:
            user = oauth2.get_current_active_user(token)
            user_out = UserOut.__pydantic_model__.parse_raw(user.to_json())
            return ResponseSchema(user_out)
        except mongoengine.errors.DoesNotExist as e:
            return ResponseSchema(AppException(str(e)))
        except Exception as e:
            return ResponseSchema(AppException(str(e)))


class UserService(BaseUserService):

    def __init__(self):
        super().__init__()
        self._temp_token = ""
        self._temp_otp = ""

    def generate_otp_for_user_creation(self, user_schema: UserSchema) -> ResponseSchema:
        try:
            user = User(**user_schema.dict())
            token = oauth2.create_access_token(
                data={'email': user.email})
            self._temp_token = token
            status, msg = sendgrid_service.send_user_verification_mail(
                user.email, token)
            if not status:
                return ResponseSchema(AppException("Failed to Send Verification Mail " + str(msg)))
            otp = oauth2.create_otp_for_phone()
            self._temp_otp = otp
            status, msg = sendgrid_service.send_otp_verification_sms(
                user.phone, otp)
            if not status:
                return ResponseSchema(AppException("Failed to Send OTP" + str(msg)))
            return ResponseSchema("Successfully Sent OTP to Mail and Phone ")
        except Exception as e:
            return ResponseSchema(AppException(str(e)))

    def create_user(self, user_schema: UserOTPVerificationSchema) -> ResponseSchema:
        try:
            if user_schema.email_token != self._temp_token or user_schema.phone_otp != self._temp_otp:
                return ResponseSchema(AppException("Failed to Verify OTP"))
            user = User(
                email = user_schema.email,
                name = user_schema.name,
                phone = user_schema.phone,
                is_seller = user_schema.is_seller,
                is_customer = user_schema.is_customer,
                is_deliverypartner = user_schema.is_deliverypartner,
                is_admin = False,
                is_executive = False,
                is_active = True,
                is_verified = True
            )
            return self._user_repository.add_user(user)
        except Exception as e:
            return ResponseSchema(AppException(str(e)))
        
class AdminUserService(BaseUserService):

    def __init__(self):
        super().__init__()

    def create_admin_user(self,super_user_data):
        try:
            password = super_user_data["password"]
            hashed_password = get_password_hash(password)
            user = User(
                email = super_user_data["email"],
                name = super_user_data["email"],
                phone = super_user_data["phone"],
                password = hashed_password,  
                is_seller = False,
                is_customer = False,
                is_deliverypartner = False,
                is_admin = True,
                is_executive = True,
                is_active = True,
                is_verified = True
            )
            self._user_repository.add_user(user)
            return True
        except Exception as e:
            return False
        
    def get_all_users(self, token: str) -> ResponseSchema:
        try:
            user_who_made_request = oauth2.get_current_active_staff(token)
            return self._user_repository.get_all_users()
        except Exception as e:
            return ResponseSchema(AppException(str(e)))
        
    def create_jwt_token(self, credential) -> ResponseSchema:
        try:
            user = User.objects.get(email=credential.email)
            if user:
                if not user.is_verified:
                    raise AppException("Email not Activated")

                if not user.is_active:
                    raise AppException("User not Active")
                if verify_hash_password(credential.password, user.password):
                    access_token = oauth2.create_access_token(
                        data={'email': user.email})
                    return ResponseSchema({'access': access_token, 'token_type': 'bearer'})
                else:
                    raise AppException("Invalid Email/Password Combination")
        except Exception as e:
            return ResponseSchema(AppException(str(e)))
        
    def get_user_by_email(self, user_email: str, token: str) -> ResponseSchema:
        try:
            user_who_made_request = oauth2.get_current_active_staff(token)
            return self._user_repository.get_by_email(user_email)
        except Exception as e:
            return ResponseSchema(AppException(str(e)))

    def delete_user(self, user_email: str, token: str) -> ResponseSchema:
        try:
            user_who_made_request = oauth2.get_current_active_staff(token)
            return self._user_repository.delete_user(user_email)
        except mongoengine.errors.DoesNotExist as e:
            return ResponseSchema(AppException(str(e)))
        
    def get_current_active_user(self, token: str) -> ResponseSchema:
        try:
            user = oauth2.get_current_active_user(token)
            user_out = AdminUserOut.__pydantic_model__.parse_raw(user.to_json())
            return ResponseSchema(user_out)
        except mongoengine.errors.DoesNotExist as e:
            return ResponseSchema(AppException(str(e)))
        except Exception as e:
            return ResponseSchema(AppException(str(e)))

