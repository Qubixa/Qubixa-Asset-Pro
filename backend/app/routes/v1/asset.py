from flask import Blueprint, jsonify

asset_bp = Blueprint('asset', __name__, url_prefix='/api/v1/assets')

@asset_bp.route('/', methods=['GET'])
def get_assets():
    return jsonify([{"id": 1, "name": "Dell Laptop", "value": 1000.0}])
