from starlette.config import Config
from .production import *

PRODUCTION = False

PROJECT_NAME = "Product EveryDay"
API_V1 = "/user/v1"

if not PRODUCTION:
    from .development import *