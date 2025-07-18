from .auth import auth_bp
from .asset import asset_bp
from .user import user_bp
from .settings import settings_v1

def register_routes(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(asset_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(settings_v1)