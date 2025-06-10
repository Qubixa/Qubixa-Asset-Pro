"""
Models package initialization
Exports all database models for the Asset Management System
"""

from app.db import db
from datetime import datetime

# Import all models to ensure they are registered with SQLAlchemy
from .models import BranchLocation
from .models import Department
from .models import AssetCategory
from .models import AssetCondition
from .models import TransferDisposalRule
from .models import MaintenanceDepreciation
from .models import Asset
from .models import AssetTransfer
from .models import Maintenance
from .models import AssetDisposal
from .models import User
from .models import LoginAudit
from .models import RolePermission

# Export all models for easy importing
__all__ = [
    'BranchLocation',
    'Department',
    'AssetCategory',
    'AssetCondition',
    'TransferDisposalRule',
    'MaintenanceDepreciation',
    'Asset',
    'AssetTransfer',
    'Maintenance',
    'AssetDisposal',
    'User',
    'LoginAudit',
    'RolePermission',
]

# Model registry for dynamic access
MODEL_REGISTRY = {
    'branch_location': BranchLocation,
    'department': Department,
    'asset_category': AssetCategory,
    'asset_condition': AssetCondition,
    'transfer_disposal_rule': TransferDisposalRule,
    'maintenance_depreciation': MaintenanceDepreciation,
    'asset': Asset,
    'asset_transfer': AssetTransfer,
    'maintenance': Maintenance,
    'asset_disposal': AssetDisposal,
    'user': User,
    'login_audit': LoginAudit,
    'role_permission': RolePermission,
}

def get_model(model_name):
    """
    Get model class by name
    
    Args:
        model_name (str): Name of the model
        
    Returns:
        Model class or None if not found
    """
    return MODEL_REGISTRY.get(model_name.lower())

def create_default_data():
    """
    Create default system data if database is empty
    """
    try:
        # Create default admin user if no users exist
        if User.query.count() == 0:
            from werkzeug.security import generate_password_hash
            
            admin_user = User(
                username='admin',
                email='admin@system.com',
                password_hash=generate_password_hash('admin123'),
                role='admin',
                status='Active',
                created_at=datetime.utcnow()
            )
            db.session.add(admin_user)
            
        # Create default role permissions
        if RolePermission.query.count() == 0:
            default_permissions = [
                {'role': 'admin', 'permission': 'all', 'resource': '*'},
                {'role': 'manager', 'permission': 'read,write', 'resource': 'assets'},
                {'role': 'user', 'permission': 'read', 'resource': 'assets'},
                {'role': 'viewer', 'permission': 'read', 'resource': 'reports'},
            ]
            
            for perm_data in default_permissions:
                permission = RolePermission(
                    role=perm_data['role'],
                    permission=perm_data['permission'],
                    resource=perm_data['resource']
                )
                db.session.add(permission)
        
        # Create default asset conditions
        if AssetCondition.query.count() == 0:
            default_conditions = [
                {'name': 'Excellent', 'code': 'EXC', 'transferable': True, 'color': 'green'},
                {'name': 'Good', 'code': 'GOOD', 'transferable': True, 'color': 'blue'},
                {'name': 'Fair', 'code': 'FAIR', 'transferable': True, 'color': 'orange'},
                {'name': 'Poor', 'code': 'POOR', 'transferable': False, 'color': 'red'},
                {'name': 'Damaged', 'code': 'DMG', 'transferable': False, 'color': 'red'},
            ]
            
            for condition_data in default_conditions:
                condition = AssetCondition(
                    name=condition_data['name'],
                    code=condition_data['code'],
                    transferable=condition_data['transferable'],
                    color=condition_data['color']
                )
                db.session.add(condition)
        
        # Create default asset categories
        if AssetCategory.query.count() == 0:
            default_categories = [
                {'name': 'Computer Equipment', 'code': 'COMP', 'transferable': True, 'trackable': True},
                {'name': 'Office Furniture', 'code': 'FURN', 'transferable': True, 'trackable': True},
                {'name': 'Vehicles', 'code': 'VEH', 'transferable': True, 'trackable': True},
                {'name': 'Machinery', 'code': 'MACH', 'transferable': True, 'trackable': True},
                {'name': 'Software Licenses', 'code': 'SOFT', 'transferable': False, 'trackable': True},
            ]
            
            for category_data in default_categories:
                category = AssetCategory(
                    name=category_data['name'],
                    code=category_data['code'],
                    transferable=category_data['transferable'],
                    trackable=category_data['trackable']
                )
                db.session.add(category)
        
        # Create default transfer/disposal rules
        if TransferDisposalRule.query.count() == 0:
            default_rules = [
                {'name': 'Standard Transfer', 'approval': 'Manager', 'duration': '7 days', 'rule_type': 'Transfer'},
                {'name': 'High Value Transfer', 'approval': 'Director', 'duration': '14 days', 'rule_type': 'Transfer'},
                {'name': 'Asset Disposal', 'approval': 'Director', 'duration': '30 days', 'rule_type': 'Disposal'},
                {'name': 'Emergency Transfer', 'approval': 'Manager', 'duration': '1 day', 'rule_type': 'Transfer'},
            ]
            
            for rule_data in default_rules:
                rule = TransferDisposalRule(
                    name=rule_data['name'],
                    approval=rule_data['approval'],
                    duration=rule_data['duration'],
                    rule_type=rule_data['rule_type']
                )
                db.session.add(rule)
        
        # Commit all default data
        db.session.commit()
        print("Default system data created successfully")
        
    except Exception as e:
        db.session.rollback()
        print(f"Error creating default data: {str(e)}")

# Database event listeners
from sqlalchemy import event

@event.listens_for(Asset, 'before_insert')
def generate_asset_tag(mapper, connection, target):
    """
    Generate asset tag before inserting new asset
    """
    if not target.asset_tag:
        # Generate asset tag based on category and sequence
        category_code = target.asset_category.code if target.asset_category else 'GEN'
        
        # Get next sequence number for this category
        last_asset = Asset.query.filter(
            Asset.asset_tag.like(f"{category_code}%")
        ).order_by(Asset.id.desc()).first()
        
        if last_asset and last_asset.asset_tag:
            try:
                last_num = int(last_asset.asset_tag.split('-')[-1])
                next_num = last_num + 1
            except (ValueError, IndexError):
                next_num = 1
        else:
            next_num = 1
        
        target.asset_tag = f"{category_code}-{next_num:06d}"

@event.listens_for(User, 'before_insert')
def set_user_defaults(mapper, connection, target):
    """
    Set default values for new users
    """
    if not target.status:
        target.status = 'Active'
    if not target.role:
        target.role = 'user'
    if not target.created_at:
        target.created_at = datetime.utcnow()
