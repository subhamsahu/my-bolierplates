from fastapi import Request
from starlette.responses import JSONResponse
from starlette.status import (
    HTTP_200_OK)


class AppException(Exception):
    def __init__(self, exception_reason: str):
        self.exception_reason = exception_reason
        self.status_code = HTTP_200_OK

    def __str__(self):
        return (
                f"<AppException {self.exception_reason} - "
                + f"status_code={self.status_code}>"
        )


def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "app_exception": exc.exception_reason,
        },
    )


# class ProductException(object):  #for creating custom exception
#     class ProductCreateException(AppException):
#         def __init__(self, exception_reason: str):
#             AppException.__init__(self, exception_reason)
