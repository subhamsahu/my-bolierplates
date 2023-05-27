import uvicorn
import os
from app.core.utils import display_dotted_string
from app.core.settings import HOSTNAME,PORT

if __name__ == "__main__":
    display_dotted_string("Product Everyday User Service")
    uvicorn.run("app.main:app", host=HOSTNAME, port = int(PORT), reload=True)
