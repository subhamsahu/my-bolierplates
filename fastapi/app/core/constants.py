from pathlib import Path
from app.core.settings import PRODUCTION

PROJECT_NAME = "Automation Utility Tools"
API_V1 = "/api/v1"
SITE_URL = "http://127.0.0.1:33507"
SITE_NAME = "Automation Utility Tools"

if PRODUCTION:
    database_name = "microservice_app"
else:
    database_name = "microservice_app"
    
APP_PATH = Path(__file__).parent.parent
