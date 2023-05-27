import logging
from mongoengine import connect, disconnect
from app.core.settings import DATABASE

from dotenv import load_dotenv
import os

MONGODB_HOST = os.getenv("MONGODB_HOST")
MONGODB_PORT = os.getenv("MONGODB_PORT")

async def connect_to_mongo():
    logging.info("Connecting to mongo...")
    try:
        connect(db = DATABASE['mongodb']['database'], host = DATABASE['mongodb']['host'], port = DATABASE['mongodb']['port'])
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
