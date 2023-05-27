from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.exceptions import RequestValidationError

from starlette.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException

from pydantic import BaseConfig

from app.core.settings import PROJECT_NAME, API_V1, DOCS_URL, REDOC_URL
from app.db.mongodb_connection import close_mongo_connection, connect_to_mongo
from app.api.router.routers import router as api_router
from app.exceptions.request_exceptions import (
    http_exception_handler,
    request_validation_exception_handler,
)
from app.exceptions.app_exceptions import app_exception_handler
from app.exceptions.app_exceptions import AppException
from app.core.logging import register_logs

from fastapi_health import health


def healthy_condition():
    # All Dependent Services Checks will come here
    return {"service": "online"}


app = FastAPI(
    title=PROJECT_NAME,
    docs_url=DOCS_URL,
    redoc_url=REDOC_URL
)

# app.mount('/static', StaticFiles(directory='resources/static'),name='static')

logger = register_logs(app)

app.add_api_route("/user/api/v1/health", health([healthy_condition]))
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


@app.exception_handler(AppException)
def custom_app_exception_handler(request, e):
    return app_exception_handler(request, e)


async def startup_services():
    try:
        await connect_to_mongo()
    except Exception as e:
        print(str(e))


async def cleanup_services():
    try:
        await close_mongo_connection()
    except Exception as e:
        print(str(e))


app.add_event_handler("startup", startup_services)
app.add_event_handler("shutdown", cleanup_services)
app.include_router(api_router, prefix=API_V1)
