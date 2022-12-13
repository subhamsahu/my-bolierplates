import logging
from mongoengine import connect, disconnect
from app.core.constants import database_name
from app.core.settings import PRODUCTION
from dotenv import load_dotenv
import os

MONGODB_HOST = os.getenv("MONGODB_HOST")
MONGODB_PORT = os.getenv("MONGODB_PORT")

async def connect_to_mongo():
    logging.info("Connecting to mongo...")
    try:
        connect(db = database_name, host = MONGODB_HOST, port = int(MONGODB_PORT))
    except Exception as e:
        logging.error(str(e))
    logging.info("Connected to mongo successfully...")


async def close_mongo_connection():
    logging.info("Closing mongo connection...")
    try:
        disconnect()
    except Exception as e:
        logging.error(str(e))
    logging.info("Mongo connection closed successfully...")