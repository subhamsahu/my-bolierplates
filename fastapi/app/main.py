from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseConfig
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.exceptions import RequestValidationError

from app.core.constants import PROJECT_NAME, API_V1
from app.db.mongodb_connection import close_mongo_connection, connect_to_mongo
from app.api.router.routers import router as api_router
from app.exceptions.request_exceptions import (
    http_exception_handler,
    request_validation_exception_handler,
)
from app.exceptions.app_exceptions import app_exception_handler
from app.exceptions.app_exceptions import APPException

app = FastAPI(title=PROJECT_NAME)
BaseConfig.arbitrary_types_allowed = True

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(StarletteHTTPException)
def custom_http_exception_handler(request, e):
    return http_exception_handler(request, e)


@app.exception_handler(RequestValidationError)
def custom_validation_exception_handler(request, e):
    return request_validation_exception_handler(request, e)


@app.exception_handler(APPException)
def custom_app_exception_handler(request, e):
    return app_exception_handler(request, e)


async def startup_service():
    try:
        await connect_to_mongo()
    except Exception as e:
        print(str(e))


app.add_event_handler("startup", startup_service)
app.add_event_handler("shutdown", close_mongo_connection)
app.include_router(api_router, prefix=API_V1)
