from enum import unique
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.params import Body
import pymongo
import os

from pymongo import message
from pymongo import database

databse_url = "mongodb://root:rootpassword@localhost:27017/admin"

def get_db():
    engine = pymongo.MongoClient(databse_url)
    db_name = "collect"

    try:
        db = engine.get_database(db_name)
        db.list_collection_names()
        yield db
    finally:
        engine.close()

app = FastAPI(title="AutoClass", description="Youtube classroom")

