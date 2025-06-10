from flask import Blueprint, jsonify
from app.models.user import User

user_bp = Blueprint('user', __name__, url_prefix='/api/v1/users')

@user_bp.route('/', methods=['GET'])
def list_users():
    return jsonify([
        {"id": 1, "username": "admin", "email": "admin@example.com"},
        {"id": 2, "username": "jane", "email": "jane@example.com"}
    ])
