from fastapi import APIRouter, Depends, Request, Body, Header, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from pydantic import EmailStr


from app.schema.auth_schema import  Token
from app.schema.user_schema import UserSchema
from app.services.user_service import UserService
from app.schema.response_schema import ResponseSchema

router = APIRouter()
user_service = UserService()


@router.post("/user/firm/create", response_description="Create a Firm for Shipbharat User", tags=["ShipBharat Auth"])
async def user_firm_create(user_data: UserSchema = Body(...)) -> ResponseSchema:
    return user_service.create_user_firm(user_data)