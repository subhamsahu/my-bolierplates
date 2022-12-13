import os
from dotenv import load_dotenv

load_dotenv(".env")

database_name = os.getenv("database_name")
jira_collection_name = os.getenv("jira_collection_name")