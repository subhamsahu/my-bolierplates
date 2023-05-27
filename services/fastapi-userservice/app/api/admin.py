from fastapi import APIRouter, Depends, Request, Body, Header, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from pydantic import EmailStr


from app.schema.auth_schema import Token
from app.schema.user_schema import UserSchema, UserOTPVerificationSchema, AdminLoginSchema
from app.services.user_service import UserService, AdminUserService
from app.schema.response_schema import ResponseSchema

router = APIRouter()
admin_user_service = AdminUserService()

@router.post('/admin/jwt/create', response_description="Create JWT Token for Admin User", tags=["Admin Auth"])
def admin_jwt_create(credential: AdminLoginSchema = Body(...)):
    return admin_user_service.create_jwt_token(credential)

@router.post('/admin/jwt/verify', response_description="Verify JWT Token for Admin User", tags=["Admin Auth"])
def admin_jwt_verify(access:str=Header(None)):
    return admin_user_service.verify_jwt_token(access)

@router.get('/admin/user/me', response_description="Get Current Active Admin User", tags=["Admin Auth"])
def auth_user_me_read(access:str=Header(None)):
    return admin_user_service.get_current_active_user(access)

@router.get("/admin/users", response_description="Return List of All Users", tags=["Admin Auth"])
def get_users(access:str=Header(None)):
    return admin_user_service.get_all_users(access)

# @router.post('/admin/user/create', tags=["Admin Auth"])
# def create_user(email: EmailStr, access:str=Header(None)):
#     return admin_user_service.delete_user(email,access)

@router.get('/admin/users/{id}', tags=["Admin Auth"])
def get_user(email: EmailStr, access:str=Header(None)):
    return admin_user_service.get_user_by_email(email,access)

@router.delete('/admin/users/{id}', tags=["Admin Auth"])
def delete_user(email: EmailStr, access:str=Header(None)):
    return admin_user_service.delete_user(email,access)



