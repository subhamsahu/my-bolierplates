import uvicorn
import os
from dotenv import load_dotenv
from app.utils.util import display_dotted_string

load_dotenv()  # take environment variables from .env.

SERVER_IP = os.getenv("SERVER_IP")
SERVER_PORT = os.getenv("SERVER_PORT")

if __name__ == "__main__":
    display_dotted_string("MicroService App")
    uvicorn.run("app.main:app", host=SERVER_IP, port = int(os.environ.get('PORT', SERVER_PORT)), reload=True)
