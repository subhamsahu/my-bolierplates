from fastapi import APIRouter, Depends, Request, Body, Header, status
from app.schema.response_schema import ResponseSchema


router = APIRouter()

@router.get("/health", status_code=status.HTTP_201_CREATED, response_description="Health Check API", tags=["Health Check"])
def health_check() -> ResponseSchema:
    return ResponseSchema("200 Ok")

