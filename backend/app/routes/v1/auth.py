from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from datetime import timedelta

auth_bp = Blueprint('auth', __name__, url_prefix='/api/v1/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Dummy user check (replace with DB check)
    if username == "admin" and password == "admin":
        token = create_access_token(identity=username, expires_delta=timedelta(hours=1))
        return jsonify(access_token=token), 200
    return jsonify(msg="Bad credentials"), 401
