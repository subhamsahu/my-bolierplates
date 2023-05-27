from pydantic import BaseModel,EmailStr
from typing import Optional

class Login(BaseModel):
    email : EmailStr
    password : str

class Token(BaseModel):
    access: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[EmailStr] = None