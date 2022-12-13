import inspect
from app.exceptions.app_exceptions import APPException
from starlette.status import (
    HTTP_200_OK)


class ResponseSchema(object):
    def __init__(self, arg):
        if isinstance(arg, APPException):
            self.success = False
            self.exception_reason = arg.exception_reason
            self.status_code = HTTP_200_OK
            self.data = {}
        else:
            self.success = True
            self.exception_reason = None
            self.status_code = HTTP_200_OK
            self.data = arg

    def __str__(self):
        if self.success:
            return "[Success]"
        return f'[Exception] "{self.exception_reason}"'

    def __repr__(self):
        if self.success:
            return "<ServiceResult Success>"
        return f"<ServiceResult AppException {self.exception_reason}>"

    def __enter__(self):
        return self.data

    def __exit__(self, *kwargs):
        pass


def caller_info() -> str:
    info = inspect.getframeinfo(inspect.stack()[2][0])
    return f"{info.filename}:{info.function}:{info.lineno}"


def handle_result(result: ResponseSchema):
    if not result.success:
        with result as exception:
            print(f"{exception} | caller={caller_info()}")
            raise exception
    with result as result:
        return result
