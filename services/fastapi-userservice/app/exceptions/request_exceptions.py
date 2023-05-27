from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError

from starlette.exceptions import HTTPException
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.status import HTTP_422_UNPROCESSABLE_ENTITY


def http_exception_handler(
    request: Request, exc: HTTPException
) -> JSONResponse:
    return JSONResponse({"detail": exc.detail}, status_code=exc.status_code)


def request_validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    return JSONResponse(
        status_code=HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": jsonable_encoder(exc.errors())},
    )