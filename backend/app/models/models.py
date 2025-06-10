from datetime import datetime
from app.db import db
from sqlalchemy.ext.hybrid import hybrid_property

# Association table for Department-Branch many-to-many relationship
department_branches = db.Table(
    'department_branches',
    db.Column('department_id', db.Integer, db.ForeignKey('department.id'), primary_key=True),
    db.Column('branch_location_id', db.Integer, db.ForeignKey('branch_location.id'), primary_key=True)
)

class BranchLocation(db.Model):
    __tablename__ = 'branch_location'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    code = db.Column(db.String(50), unique=True, nullable=False)
    address = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(50), default='Active')  # Active/Inactive
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    departments = db.relationship('Department', secondary=department_branches, 
                                  back_populates='branches')
    assets = db.relationship('Asset', back_populates='branch_location')

class Department(db.Model):
    __tablename__ = 'department'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    code = db.Column(db.String(50), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    branches = db.relationship('BranchLocation', secondary=department_branches, 
                               back_populates='departments')
    assets = db.relationship('Asset', back_populates='department')

class AssetCategory(db.Model):
    __tablename__ = 'asset_category'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    code = db.Column(db.String(50), unique=True, nullable=False)
    transferable = db.Column(db.Boolean, default=True)
    trackable = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    assets = db.relationship('Asset', back_populates='category')
    depreciation_rules = db.relationship('MaintenanceDepreciation', 
                                        back_populates='asset_category')

class AssetCondition(db.Model):
    __tablename__ = 'asset_condition'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    code = db.Column(db.String(50), unique=True, nullable=False)
    transferable = db.Column(db.Boolean, default=True)
    color = db.Column(db.String(50))  # For UI representation
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    assets = db.relationship('Asset', back_populates='condition')

class TransferDisposalRule(db.Model):
    __tablename__ = 'transfer_disposal_rule'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    approval = db.Column(db.String(255), nullable=False)  # e.g., "Department Head"
    duration = db.Column(db.String(100), nullable=False)  # e.g., "1-3 days"
    rule_type = db.Column(db.String(50))  # Transfer/Disposal/Revocation
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class MaintenanceDepreciation(db.Model):
    __tablename__ = 'maintenance_depreciation'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    frequency = db.Column(db.String(100))  # e.g., "Monthly"
    branches = db.Column(db.String(255))  # Comma-separated branch codes
    rate = db.Column(db.String(100))  # e.g., "20% annually"
    rule_type = db.Column(db.String(50))  # Maintenance/Depreciation
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship to AssetCategory
    category_id = db.Column(db.Integer, db.ForeignKey('asset_category.id'))
    asset_category = db.relationship('AssetCategory', back_populates='depreciation_rules')

class Asset(db.Model):
    __tablename__ = 'asset'

    id = db.Column(db.Integer, primary_key=True)
    asset_tag = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    purchase_date = db.Column(db.Date, nullable=False)
    cost = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default='Available')  # Available, In Use, etc.
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Foreign keys
    category_id = db.Column(db.Integer, db.ForeignKey('asset_category.id'))
    condition_id = db.Column(db.Integer, db.ForeignKey('asset_condition.id'))
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'))
    branch_location_id = db.Column(db.Integer, db.ForeignKey('branch_location.id'))
    
    # Relationships
    category = db.relationship('AssetCategory', back_populates='assets')
    condition = db.relationship('AssetCondition', back_populates='assets')
    department = db.relationship('Department', back_populates='assets')
    branch_location = db.relationship('BranchLocation', back_populates='assets')
    transfers = db.relationship('AssetTransfer', back_populates='asset', cascade='all, delete-orphan')
    maintenance_records = db.relationship('Maintenance', back_populates='asset', cascade='all, delete-orphan')
    disposal = db.relationship('AssetDisposal', back_populates='asset', uselist=False, cascade='all, delete-orphan')
    
    # Hybrid property for location (derived from branch_location)
    @hybrid_property
    def location(self):
        return self.branch_location.name if self.branch_location else None

class AssetTransfer(db.Model):
    __tablename__ = 'asset_transfer'

    id = db.Column(db.Integer, primary_key=True)
    asset_id = db.Column(db.Integer, db.ForeignKey('asset.id'), nullable=False)
    transfer_date = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    responsible_person = db.Column(db.String(255), nullable=False)
    
    # Foreign keys
    from_branch_id = db.Column(db.Integer, db.ForeignKey('branch_location.id'))
    to_branch_id = db.Column(db.Integer, db.ForeignKey('branch_location.id'))
    
    # Relationships
    asset = db.relationship('Asset', back_populates='transfers')
    from_branch = db.relationship('BranchLocation', foreign_keys=[from_branch_id])
    to_branch = db.relationship('BranchLocation', foreign_keys=[to_branch_id])

class Maintenance(db.Model):
    __tablename__ = 'maintenance'

    id = db.Column(db.Integer, primary_key=True)
    asset_id = db.Column(db.Integer, db.ForeignKey('asset.id'), nullable=False)
    maintenance_date = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    description = db.Column(db.Text, nullable=False)
    cost = db.Column(db.Float, default=0.0)
    performed_by = db.Column(db.String(255))
    
    # Relationship
    asset = db.relationship('Asset', back_populates='maintenance_records')

class AssetDisposal(db.Model):
    __tablename__ = 'asset_disposal'

    id = db.Column(db.Integer, primary_key=True)
    asset_id = db.Column(db.Integer, db.ForeignKey('asset.id'), nullable=False, unique=True)
    disposal_date = db.Column(db.Date, nullable=False)
    reason = db.Column(db.Text)
    
    # Relationship
    asset = db.relationship('Asset', back_populates='disposal')

# User models remain the same
class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)  # admin, manager, viewer
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class LoginAudit(db.Model):
    __tablename__ = 'login_audit'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    ip_address = db.Column(db.String(100))
    user = db.relationship('User', backref=db.backref('login_audits', lazy=True))

class RolePermission(db.Model):
    __tablename__ = 'role_permission'

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(50), nullable=False)
    permission = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))