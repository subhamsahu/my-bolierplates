from fastapi import APIRouter, Depends, Request, Body, Header, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from pydantic import EmailStr


from app.schema.auth_schema import  Token
from app.schema.user_schema import UserSchema,UserOTPVerificationSchema
from app.services.user_service import UserService, AdminUserService
from app.schema.response_schema import ResponseSchema

router = APIRouter()
user_service = UserService()
admin_user_service = AdminUserService()

@router.post("/auth/user/generateotp", status_code=status.HTTP_201_CREATED, response_description="Generate OTP for user email and phone", tags=["UserService Auth"])
async def auth_user_generate_otp(user_data: UserSchema = Body(...)):
    return user_service.generate_otp_for_user_creation(user_data)

@router.post("/auth/user/create", status_code=status.HTTP_201_CREATED, response_description="Create a User for PED", tags=["UserService Auth"])
async def auth_user_create_verify_otp(user_data: UserOTPVerificationSchema = Body(...)):
    return user_service.create_user(user_data)

@router.get("/auth/verify/email", status_code=status.HTTP_200_OK, tags=["UserService Auth"])
async def auth_email_verify(request: Request, token: str):
    return user_service.verify_user_email_from_token(token)

@router.post('/auth/jwt/verify', tags=["UserService Auth"])
def auth_user_me_read(access:str=Header(None)):
    return user_service.verify_jwt_token(access)

@router.get('/auth/user/me', tags=["UserService Auth"])
def auth_user_me_read(access:str=Header(None)):
    return user_service.get_current_active_user(access)


# post-- auth_jwt_create_create
# post-- auth_jwt_refresh_create
# post-- auth_jwt_verify_create
# get--  auth_users_list
# post-- auth_users_create
# post-- auth_users_activation
# get-- auth_users_me_read
# put-- auth_users_me_update
# patch-- auth_users_me_partial_update
# del-- auth_users_me_delete
# post-- auth_users_resend_activation
# post-- auth_users_reset_username
# post-- auth_users_reset_username_confirm
# post-- auth_users_reset_password
