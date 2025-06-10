from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError
from datetime import datetime, date
import json
import io
from app.db import db
from app.models import (
    BranchLocation, Department, AssetCategory, AssetCondition,
    TransferDisposalRule, MaintenanceDepreciation, Asset,
    AssetTransfer, Maintenance, AssetDisposal, User, LoginAudit, RolePermission
)

# Create Blueprint for v1 settings routes
settings_v1 = Blueprint('settings_v1', __name__, url_prefix='/api/v1')

# Helper function for error responses
def error_response(message, status_code=400):
    return jsonify({'error': message, 'success': False}), status_code

# Helper function for success responses
def success_response(data=None, message="Success", status_code=200):
    response = {'success': True, 'message': message}
    if data is not None:
        response['data'] = data
    return jsonify(response), status_code

# Helper function to serialize SQLAlchemy objects
def serialize_model(obj):
    """Convert SQLAlchemy model instance to dictionary"""
    if obj is None:
        return None
    
    result = {}
    for column in obj.__table__.columns:
        value = getattr(obj, column.name)
        if isinstance(value, (date, datetime)):
            result[column.name] = value.isoformat()
        else:
            result[column.name] = value
    return result

def serialize_list(objects):
    """Convert list of SQLAlchemy objects to list of dictionaries"""
    return [serialize_model(obj) for obj in objects]

# ==================== BRANCH LOCATIONS ROUTES ====================

@settings_v1.route('/branch-locations', methods=['GET'])
@jwt_required()
def get_branch_locations():
    """Get all branch locations"""
    try:
        branches = BranchLocation.query.all()
        return success_response(serialize_list(branches))
    except Exception as e:
        return error_response(f"Failed to fetch branch locations: {str(e)}", 500)

@settings_v1.route('/branch-locations', methods=['POST'])
@jwt_required()
def create_branch_location():
    """Create new branch location"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'code', 'address']
        for field in required_fields:
            if not data.get(field):
                return error_response(f"Missing required field: {field}")
        
        # Check if code already exists
        existing = BranchLocation.query.filter_by(code=data['code']).first()
        if existing:
            return error_response("Branch code already exists")
        
        branch = BranchLocation(
            name=data['name'],
            code=data['code'],
            address=data['address'],
            status=data.get('status', 'Active')
        )
        
        db.session.add(branch)
        db.session.commit()
        
        return success_response(serialize_model(branch), "Branch location created successfully", 201)
    
    except IntegrityError:
        db.session.rollback()
        return error_response("Branch code must be unique")
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to create branch location: {str(e)}", 500)

@settings_v1.route('/branch-locations/<int:branch_id>', methods=['PUT'])
@jwt_required()
def update_branch_location(branch_id):
    """Update branch location"""
    try:
        branch = BranchLocation.query.get_or_404(branch_id)
        data = request.get_json()
        
        # Update fields if provided
        if 'name' in data:
            branch.name = data['name']
        if 'code' in data:
            # Check if new code conflicts with existing
            existing = BranchLocation.query.filter(
                BranchLocation.code == data['code'],
                BranchLocation.id != branch_id
            ).first()
            if existing:
                return error_response("Branch code already exists")
            branch.code = data['code']
        if 'address' in data:
            branch.address = data['address']
        if 'status' in data:
            branch.status = data['status']
        
        db.session.commit()
        return success_response(serialize_model(branch), "Branch location updated successfully")
    
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to update branch location: {str(e)}", 500)

@settings_v1.route('/branch-locations/<int:branch_id>', methods=['DELETE'])
@jwt_required()
def delete_branch_location(branch_id):
    """Delete branch location"""
    try:
        branch = BranchLocation.query.get_or_404(branch_id)
        
        # Check if branch has associated assets
        if hasattr(branch, 'assets') and branch.assets:
            return error_response("Cannot delete branch with associated assets")
        
        db.session.delete(branch)
        db.session.commit()
        
        return success_response(message="Branch location deleted successfully")
    
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to delete branch location: {str(e)}", 500)

# ==================== DEPARTMENTS ROUTES ====================

@settings_v1.route('/departments', methods=['GET'])
@jwt_required()
def get_departments():
    """Get all departments"""
    try:
        departments = Department.query.all()
        result = []
        for dept in departments:
            dept_data = serialize_model(dept)
            # Handle branches relationship if it exists
            if hasattr(dept, 'branches'):
                dept_data['branches'] = [branch.code for branch in dept.branches]
            else:
                dept_data['branches'] = []
            result.append(dept_data)
        return success_response(result)
    except Exception as e:
        return error_response(f"Failed to fetch departments: {str(e)}", 500)

@settings_v1.route('/departments', methods=['POST'])
@jwt_required()
def create_department():
    """Create new department"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'code']
        for field in required_fields:
            if not data.get(field):
                return error_response(f"Missing required field: {field}")
        
        # Check if code already exists
        existing = Department.query.filter_by(code=data['code']).first()
        if existing:
            return error_response("Department code already exists")
        
        department = Department(
            name=data['name'],
            code=data['code']
        )
        
        # Add branch associations if provided and relationship exists
        if 'branches' in data and data['branches'] and hasattr(department, 'branches'):
            if isinstance(data['branches'], list):
                branch_codes = data['branches']
            else:
                branch_codes = [code.strip() for code in data['branches'].split(',')]
            
            for code in branch_codes:
                if code and code != 'All':
                    branch = BranchLocation.query.filter_by(code=code).first()
                    if branch:
                        department.branches.append(branch)
        
        db.session.add(department)
        db.session.commit()
        
        result = serialize_model(department)
        if hasattr(department, 'branches'):
            result['branches'] = [branch.code for branch in department.branches]
        else:
            result['branches'] = []
        
        return success_response(result, "Department created successfully", 201)
    
    except IntegrityError:
        db.session.rollback()
        return error_response("Department code must be unique")
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to create department: {str(e)}", 500)

@settings_v1.route('/departments/<int:dept_id>', methods=['PUT'])
@jwt_required()
def update_department(dept_id):
    """Update department"""
    try:
        department = Department.query.get_or_404(dept_id)
        data = request.get_json()
        
        # Update basic fields
        if 'name' in data:
            department.name = data['name']
        if 'code' in data:
            existing = Department.query.filter(
                Department.code == data['code'],
                Department.id != dept_id
            ).first()
            if existing:
                return error_response("Department code already exists")
            department.code = data['code']
        
        # Update branch associations if relationship exists
        if 'branches' in data and hasattr(department, 'branches'):
            department.branches.clear()
            if data['branches']:
                if isinstance(data['branches'], list):
                    branch_codes = data['branches']
                else:
                    branch_codes = [code.strip() for code in data['branches'].split(',')]
                
                for code in branch_codes:
                    if code and code != 'All':
                        branch = BranchLocation.query.filter_by(code=code).first()
                        if branch:
                            department.branches.append(branch)
        
        db.session.commit()
        
        result = serialize_model(department)
        if hasattr(department, 'branches'):
            result['branches'] = [branch.code for branch in department.branches]
        else:
            result['branches'] = []
        
        return success_response(result, "Department updated successfully")
    
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to update department: {str(e)}", 500)

@settings_v1.route('/departments/<int:dept_id>', methods=['DELETE'])
@jwt_required()
def delete_department(dept_id):
    """Delete department"""
    try:
        department = Department.query.get_or_404(dept_id)
        
        # Check if department has associated assets
        if hasattr(department, 'assets') and department.assets:
            return error_response("Cannot delete department with associated assets")
        
        db.session.delete(department)
        db.session.commit()
        
        return success_response(message="Department deleted successfully")
    
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to delete department: {str(e)}", 500)

# ==================== ASSET CATEGORIES ROUTES ====================

@settings_v1.route('/asset-categories', methods=['GET'])
@jwt_required()
def get_asset_categories():
    """Get all asset categories"""
    try:
        categories = AssetCategory.query.all()
        return success_response(serialize_list(categories))
    except Exception as e:
        return error_response(f"Failed to fetch asset categories: {str(e)}", 500)

@settings_v1.route('/asset-categories', methods=['POST'])
@jwt_required()
def create_asset_category():
    """Create new asset category"""
    try:
        data = request.get_json()
        
        required_fields = ['name', 'code']
        for field in required_fields:
            if not data.get(field):
                return error_response(f"Missing required field: {field}")
        
        existing = AssetCategory.query.filter_by(code=data['code']).first()
        if existing:
            return error_response("Asset category code already exists")
        
        category = AssetCategory(
            name=data['name'],
            code=data['code'],
            transferable=data.get('transferable', True),
            trackable=data.get('trackable', True)
        )
        
        db.session.add(category)
        db.session.commit()
        
        return success_response(serialize_model(category), "Asset category created successfully", 201)
    
    except IntegrityError:
        db.session.rollback()
        return error_response("Asset category code must be unique")
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to create asset category: {str(e)}", 500)

@settings_v1.route('/asset-categories/<int:category_id>', methods=['PUT'])
@jwt_required()
def update_asset_category(category_id):
    """Update asset category"""
    try:
        category = AssetCategory.query.get_or_404(category_id)
        data = request.get_json()
        
        if 'name' in data:
            category.name = data['name']
        if 'code' in data:
            existing = AssetCategory.query.filter(
                AssetCategory.code == data['code'],
                AssetCategory.id != category_id
            ).first()
            if existing:
                return error_response("Asset category code already exists")
            category.code = data['code']
        if 'transferable' in data:
            category.transferable = data['transferable']
        if 'trackable' in data:
            category.trackable = data['trackable']
        
        db.session.commit()
        return success_response(serialize_model(category), "Asset category updated successfully")
    
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to update asset category: {str(e)}", 500)

@settings_v1.route('/asset-categories/<int:category_id>', methods=['DELETE'])
@jwt_required()
def delete_asset_category(category_id):
    """Delete asset category"""
    try:
        category = AssetCategory.query.get_or_404(category_id)
        
        if hasattr(category, 'assets') and category.assets:
            return error_response("Cannot delete category with associated assets")
        
        db.session.delete(category)
        db.session.commit()
        
        return success_response(message="Asset category deleted successfully")
    
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to delete asset category: {str(e)}", 500)

# ==================== ASSET CONDITIONS ROUTES ====================

@settings_v1.route('/asset-conditions', methods=['GET'])
@jwt_required()
def get_asset_conditions():
    """Get all asset conditions"""
    try:
        conditions = AssetCondition.query.all()
        return success_response(serialize_list(conditions))
    except Exception as e:
        return error_response(f"Failed to fetch asset conditions: {str(e)}", 500)

@settings_v1.route('/asset-conditions', methods=['POST'])
@jwt_required()
def create_asset_condition():
    """Create new asset condition"""
    try:
        data = request.get_json()
        
        required_fields = ['name', 'code']
        for field in required_fields:
            if not data.get(field):
                return error_response(f"Missing required field: {field}")
        
        existing = AssetCondition.query.filter_by(code=data['code']).first()
        if existing:
            return error_response("Asset condition code already exists")
        
        condition = AssetCondition(
            name=data['name'],
            code=data['code'],
            transferable=data.get('transferable', True),
            color=data.get('color', 'gray')
        )
        
        db.session.add(condition)
        db.session.commit()
        
        return success_response(serialize_model(condition), "Asset condition created successfully", 201)
    
    except IntegrityError:
        db.session.rollback()
        return error_response("Asset condition code must be unique")
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to create asset condition: {str(e)}", 500)

@settings_v1.route('/asset-conditions/<int:condition_id>', methods=['PUT'])
@jwt_required()
def update_asset_condition(condition_id):
    """Update asset condition"""
    try:
        condition = AssetCondition.query.get_or_404(condition_id)
        data = request.get_json()
        
        if 'name' in data:
            condition.name = data['name']
        if 'code' in data:
            existing = AssetCondition.query.filter(
                AssetCondition.code == data['code'],
                AssetCondition.id != condition_id
            ).first()
            if existing:
                return error_response("Asset condition code already exists")
            condition.code = data['code']
        if 'transferable' in data:
            condition.transferable = data['transferable']
        if 'color' in data:
            condition.color = data['color']
        
        db.session.commit()
        return success_response(serialize_model(condition), "Asset condition updated successfully")
    
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to update asset condition: {str(e)}", 500)

@settings_v1.route('/asset-conditions/<int:condition_id>', methods=['DELETE'])
@jwt_required()
def delete_asset_condition(condition_id):
    """Delete asset condition"""
    try:
        condition = AssetCondition.query.get_or_404(condition_id)
        
        if hasattr(condition, 'assets') and condition.assets:
            return error_response("Cannot delete condition with associated assets")
        
        db.session.delete(condition)
        db.session.commit()
        
        return success_response(message="Asset condition deleted successfully")
    
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to delete asset condition: {str(e)}", 500)

# ==================== TRANSFER & DISPOSAL RULES ROUTES ====================

@settings_v1.route('/transfer-disposal-rules', methods=['GET'])
@jwt_required()
def get_transfer_disposal_rules():
    """Get all transfer and disposal rules"""
    try:
        rules = TransferDisposalRule.query.all()
        return success_response(serialize_list(rules))
    except Exception as e:
        return error_response(f"Failed to fetch transfer disposal rules: {str(e)}", 500)

@settings_v1.route('/transfer-disposal-rules', methods=['POST'])
@jwt_required()
def create_transfer_disposal_rule():
    """Create new transfer disposal rule"""
    try:
        data = request.get_json()
        
        required_fields = ['name', 'approval', 'duration']
        for field in required_fields:
            if not data.get(field):
                return error_response(f"Missing required field: {field}")
        
        rule = TransferDisposalRule(
            name=data['name'],
            approval=data['approval'],
            duration=data['duration'],
            rule_type=data.get('rule_type', 'Transfer')
        )
        
        db.session.add(rule)
        db.session.commit()
        
        return success_response(serialize_model(rule), "Transfer disposal rule created successfully", 201)
    
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to create transfer disposal rule: {str(e)}", 500)

@settings_v1.route('/transfer-disposal-rules/<int:rule_id>', methods=['PUT'])
@jwt_required()
def update_transfer_disposal_rule(rule_id):
    """Update transfer disposal rule"""
    try:
        rule = TransferDisposalRule.query.get_or_404(rule_id)
        data = request.get_json()
        
        if 'name' in data:
            rule.name = data['name']
        if 'approval' in data:
            rule.approval = data['approval']
        if 'duration' in data:
            rule.duration = data['duration']
        if 'rule_type' in data:
            rule.rule_type = data['rule_type']
        
        db.session.commit()
        return success_response(serialize_model(rule), "Transfer disposal rule updated successfully")
    
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to update transfer disposal rule: {str(e)}", 500)

@settings_v1.route('/transfer-disposal-rules/<int:rule_id>', methods=['DELETE'])
@jwt_required()
def delete_transfer_disposal_rule(rule_id):
    """Delete transfer disposal rule"""
    try:
        rule = TransferDisposalRule.query.get_or_404(rule_id)
        
        db.session.delete(rule)
        db.session.commit()
        
        return success_response(message="Transfer disposal rule deleted successfully")
    
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to delete transfer disposal rule: {str(e)}", 500)

# ==================== MAINTENANCE & DEPRECIATION ROUTES ====================

@settings_v1.route('/maintenance-depreciation', methods=['GET'])
@jwt_required()
def get_maintenance_depreciation():
    """Get all maintenance and depreciation rules"""
    try:
        rules = MaintenanceDepreciation.query.all()
        result = []
        for rule in rules:
            rule_data = serialize_model(rule)
            if hasattr(rule, 'asset_category') and rule.asset_category:
                rule_data['categories'] = rule.asset_category.name
            else:
                rule_data['categories'] = None
            result.append(rule_data)
        return success_response(result)
    except Exception as e:
        return error_response(f"Failed to fetch maintenance depreciation rules: {str(e)}", 500)

@settings_v1.route('/maintenance-depreciation', methods=['POST'])
@jwt_required()
def create_maintenance_depreciation():
    """Create new maintenance depreciation rule"""
    try:
        data = request.get_json()
        
        required_fields = ['name']
        for field in required_fields:
            if not data.get(field):
                return error_response(f"Missing required field: {field}")
        
        rule = MaintenanceDepreciation(
            name=data['name'],
            frequency=data.get('frequency'),
            branches=data.get('branches', 'All'),
            rate=data.get('rate'),
            rule_type=data.get('rule_type', 'Maintenance'),
            category_id=data.get('category_id')
        )
        
        db.session.add(rule)
        db.session.commit()
        
        result = serialize_model(rule)
        if hasattr(rule, 'asset_category') and rule.asset_category:
            result['categories'] = rule.asset_category.name
        else:
            result['categories'] = None
        
        return success_response(result, "Maintenance depreciation rule created successfully", 201)
    
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to create maintenance depreciation rule: {str(e)}", 500)

@settings_v1.route('/maintenance-depreciation/<int:rule_id>', methods=['PUT'])
@jwt_required()
def update_maintenance_depreciation(rule_id):
    """Update maintenance depreciation rule"""
    try:
        rule = MaintenanceDepreciation.query.get_or_404(rule_id)
        data = request.get_json()
        
        if 'name' in data:
            rule.name = data['name']
        if 'frequency' in data:
            rule.frequency = data['frequency']
        if 'branches' in data:
            rule.branches = data['branches']
        if 'rate' in data:
            rule.rate = data['rate']
        if 'rule_type' in data:
            rule.rule_type = data['rule_type']
        if 'category_id' in data:
            rule.category_id = data['category_id']
        
        db.session.commit()
        
        result = serialize_model(rule)
        if hasattr(rule, 'asset_category') and rule.asset_category:
            result['categories'] = rule.asset_category.name
        else:
            result['categories'] = None
        
        return success_response(result, "Maintenance depreciation rule updated successfully")
    
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to update maintenance depreciation rule: {str(e)}", 500)

@settings_v1.route('/maintenance-depreciation/<int:rule_id>', methods=['DELETE'])
@jwt_required()
def delete_maintenance_depreciation(rule_id):
    """Delete maintenance depreciation rule"""
    try:
        rule = MaintenanceDepreciation.query.get_or_404(rule_id)
        
        db.session.delete(rule)
        db.session.commit()
        
        return success_response(message="Maintenance depreciation rule deleted successfully")
    
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to delete maintenance depreciation rule: {str(e)}", 500)

# ==================== SYSTEM MONITORING ROUTES ====================

@settings_v1.route('/system/stats', methods=['GET'])
@jwt_required()
def get_system_stats():
    """Get system statistics"""
    try:
        stats = {
            'totalBranches': BranchLocation.query.count(),
            'activeDepartments': Department.query.count(),
            'assetCategories': AssetCategory.query.count(),
            'transferRules': TransferDisposalRule.query.count(),
            'totalAssets': Asset.query.count() if Asset.query.first() else 0,
            'activeAssets': Asset.query.filter_by(status='Available').count() if Asset.query.first() else 0,
            'systemStatus': 'healthy',
            'lastUpdated': datetime.utcnow().isoformat()
        }
        
        # Check system health
        if stats['totalBranches'] == 0 or stats['assetCategories'] == 0:
            stats['systemStatus'] = 'warning'
        
        return success_response(stats)
    
    except Exception as e:
        return error_response(f"Failed to fetch system stats: {str(e)}", 500)

@settings_v1.route('/system/health', methods=['GET'])
@jwt_required()
def check_system_health():
    """Check system health"""
    try:
        health_checks = {
            'database': 'healthy',
            'branches': 'healthy',
            'categories': 'healthy',
            'overall': 'healthy'
        }
        
        # Check database connectivity
        try:
            db.session.execute('SELECT 1')
        except:
            health_checks['database'] = 'error'
            health_checks['overall'] = 'error'
        
        # Check if basic configuration exists
        if BranchLocation.query.count() == 0:
            health_checks['branches'] = 'warning'
            if health_checks['overall'] != 'error':
                health_checks['overall'] = 'warning'
        
        if AssetCategory.query.count() == 0:
            health_checks['categories'] = 'warning'
            if health_checks['overall'] != 'error':
                health_checks['overall'] = 'warning'
        
        return success_response({
            'status': health_checks['overall'],
            'checks': health_checks,
            'timestamp': datetime.utcnow().isoformat()
        })
    
    except Exception as e:
        return error_response(f"Health check failed: {str(e)}", 500)

@settings_v1.route('/system/export', methods=['GET'])
@jwt_required()
def export_configuration():
    """Export system configuration"""
    try:
        config_data = {
            'branches': serialize_list(BranchLocation.query.all()),
            'departments': [],
            'asset_categories': serialize_list(AssetCategory.query.all()),
            'asset_conditions': serialize_list(AssetCondition.query.all()),
            'transfer_disposal_rules': serialize_list(TransferDisposalRule.query.all()),
            'maintenance_depreciation': serialize_list(MaintenanceDepreciation.query.all()),
            'export_timestamp': datetime.utcnow().isoformat(),
            'version': '1.0'
        }
        
        # Add departments with branch relationships
        departments = Department.query.all()
        for dept in departments:
            dept_data = serialize_model(dept)
            if hasattr(dept, 'branches'):
                dept_data['branches'] = [branch.code for branch in dept.branches]
            else:
                dept_data['branches'] = []
            config_data['departments'].append(dept_data)
        
        # Create in-memory file
        output = io.BytesIO()
        output.write(json.dumps(config_data, indent=2, default=str).encode('utf-8'))
        output.seek(0)
        
        return send_file(
            output,
            mimetype='application/json',
            as_attachment=True,
            download_name=f'system_config_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'
        )
    
    except Exception as e:
        return error_response(f"Failed to export configuration: {str(e)}", 500)

# ==================== USER MANAGEMENT ROUTES ====================

@settings_v1.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    """Get all users (admin only)"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if not current_user or current_user.role != 'admin':
            return error_response("Access denied. Admin role required.", 403)
        
        users = User.query.all()
        result = []
        for user in users:
            user_data = serialize_model(user)
            user_data.pop('password_hash', None)  # Remove password hash
            result.append(user_data)
        
        return success_response(result)
    
    except Exception as e:
        return error_response(f"Failed to fetch users: {str(e)}", 500)

@settings_v1.route('/role-permissions', methods=['GET'])
@jwt_required()
def get_role_permissions():
    """Get all role permissions"""
    try:
        permissions = RolePermission.query.all()
        return success_response(serialize_list(permissions))
    except Exception as e:
        return error_response(f"Failed to fetch role permissions: {str(e)}", 500)

@settings_v1.route('/login-audits', methods=['GET'])
@jwt_required()
def get_login_audits():
    """Get login audit logs (admin only)"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if not current_user or current_user.role != 'admin':
            return error_response("Access denied. Admin role required.", 403)
        
        # Get recent login audits (last 100)
        audits = LoginAudit.query.order_by(LoginAudit.timestamp.desc()).limit(100).all()
        result = []
        for audit in audits:
            audit_data = serialize_model(audit)
            if hasattr(audit, 'user') and audit.user:
                audit_data['username'] = audit.user.username
            else:
                audit_data['username'] = 'Unknown'
            result.append(audit_data)
        
        return success_response(result)
    
    except Exception as e:
        return error_response(f"Failed to fetch login audits: {str(e)}", 500)

# Error handlers
@settings_v1.errorhandler(404)
def not_found(error):
    return error_response("Resource not found", 404)

@settings_v1.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return error_response("Internal server error", 500)
