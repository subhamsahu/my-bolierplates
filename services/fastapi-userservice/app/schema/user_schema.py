from datetime import datetime
from pydantic import BaseModel,EmailStr
from app.models.user import ModeOfRegisteration
from pydantic.dataclasses import dataclass

class UserSchema(BaseModel):
    email : EmailStr
    name : str
    phone : str

class AdminLoginSchema(BaseModel):
    email : EmailStr
    password : str

class UserOTPVerificationSchema(BaseModel):
    email : EmailStr
    name : str
    phone : str
    is_seller : bool = False
    is_customer : bool = False
    is_deliverypartner : bool = False
    email_token : str
    phone_otp : str
    
@dataclass
class UserOut(BaseModel):
    email : EmailStr
    name : str
    phone : str
    is_seller : bool 
    is_customer : bool 
    is_deliverypartner : bool 
    is_active : bool
    is_verified : bool

@dataclass
class AdminUserOut(BaseModel):
    email : EmailStr
    name : str
    phone : str
    is_seller : bool 
    is_customer : bool 
    is_deliverypartner : bool 
    is_admin : bool 
    is_executive : bool 
    is_active : bool
    is_verified : bool