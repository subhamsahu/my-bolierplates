from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer

from app.core import settings
from app.models.user import User
from app.schema.auth_schema import TokenData
from app.exceptions.app_exceptions import AppException

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/user/me')


SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.JWT_TOKEN_ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES


def create_otp_for_phone():
    import math
    import random
    digits = "0123456789"
    OTP = ""
    # length of password can be changed
     # by changing value in range
    for i in range(4) :
        OTP += digits[math.floor(random.random() * 10)]
 
    return OTP


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


def verify_access_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("email")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception

    return token_data


# def get_current_user(token: str = Depends(oauth2_scheme)):
def get_current_user(token: str):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                          detail=f"Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})

    token = verify_access_token(token, credentials_exception)

    user = User.objects.get(email=token.email)
    return user


def get_current_active_user(token: str) -> User:
    current_user = get_current_user(token=token)
    if not (current_user.is_active and current_user.is_verified):
        raise AppException(
          exception_reason="The user doesn't have enough privileges"
        )
    return current_user

def get_current_active_superuser(token: str) -> User:
    current_user = get_current_user(token=token)
    if not (current_user.is_admin):
        raise AppException(
          exception_reason="The user doesn't have enough privileges"
        )
    return current_user

def get_current_active_seller(token: str) -> User:
    current_user = get_current_user(token=token)
    if not (current_user.is_seller):
        raise AppException(
          exception_reason="The user doesn't have enough privileges"
        )
    return current_user

def get_current_active_reseller(token: str) -> User:
    current_user = get_current_user(token=token)
    if not (current_user.is_reseller):
        raise AppException(
          exception_reason="The user doesn't have enough privileges"
        )
    return current_user

def get_current_active_executive(token: str) -> User:
    current_user = get_current_user(token=token)
    print(current_user.is_executive)
    if not (current_user.is_executive):
        raise AppException(
          exception_reason="The user doesn't have enough privileges"
        )
    return current_user
    
def get_current_active_staff(token: str) -> User:
    current_user = get_current_user(token=token)
    if not (current_user.is_executive or current_user.is_admin):
        raise AppException(
          exception_reason="The user doesn't have enough privileges"
        )
    return current_user
