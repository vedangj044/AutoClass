from enum import unique
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.params import Body
import pymongo
import random
import string
import os
from pymongo import message
import json
import pymongo.database as mdb
from bson.json_util import dumps
from pymongo.errors import DuplicateKeyError
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

JWT_SECRET = "heyS"

oauth2_schema = OAuth2PasswordBearer(tokenUrl='token')

class MessageModel(BaseModel):
    message: str

databse_url = "mongodb://root:rootpassword@localhost:27017/admin"

def get_db():
    engine = pymongo.MongoClient(databse_url)
    db_name = "atuoclass"

    try:
        db = engine.get_database(db_name)
        db.list_collection_names()
        yield db
    finally:
        engine.close()

def authenticate_user(username: str, password: str, db):
    user = db['users'].find_one({"username": username})
    if not user:
        return False
    if not bcrypt.verify(password, user["password"]):
        return False

    return json.loads(dumps(user))

app = FastAPI(title="AutoClass", description="Youtube classroom")

def get_class_name():
    return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(5))

@app.get("/create_class", tags=["Teacher"])
def create_class(db: mdb.Database = Depends(get_db)):

    class_name = get_class_name()
    db["classes"].insert_one({"name": class_name})
    db.create_collection(class_name)

    return MessageModel(message = "Class created successfully - " + class_name)

@app.get("/class/{class_code}", tags=["students"])
def join_class(class_code, db: mdb.Database = Depends(get_db)):
    
    l = db["classes"].find_one({"name": class_code})
    if l is None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Class not found")
    
    return MessageModel(message = "Joined class successfully.")

@app.post("/class/{class_code}/{video_code}", tags=["Teacher"])
def post_assignment(class_code, video_code, db: mdb.Database = Depends(get_db)):

    l = db["classes"].find_one({"name": class_code})
    if l is None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Class not found")
    
    url = ""
    return MessageModel(message = "Added assignment")

@app.post("/assignment", tags=["students"])
def get_new_assignment(db: mdb.Database = Depends(get_db)):

    return MessageModel(message = "New assignment can be found at " + "https://www.youtube.com/watch?v=F1F2imiOJfk")