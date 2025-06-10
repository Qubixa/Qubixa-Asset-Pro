from flask import Flask
from app.config import Config
from app.db import db
from app.extensions import jwt, swagger
from app.routes.v1 import register_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    swagger.init_app(app)

    register_routes(app)
    return app
