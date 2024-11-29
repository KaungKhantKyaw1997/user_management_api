const sequelize = require("../config/dbConfig");

const Department = require("./Department");
const Permission = require("./Permission");
const Role = require("./Role");
const RolePermission = require("./RolePermission");
const Staff = require("./Staff");
const User = require("./User");
const UserRole = require("./UserRole");

// Department and Staff Relationship
Department.hasMany(Staff, { foreignKey: "depId" });
Staff.belongsTo(Department, { foreignKey: "depId" });

// Role and RolePermission Relationship
Role.hasMany(RolePermission, { foreignKey: "roleId" });
RolePermission.belongsTo(Role, { foreignKey: "roleId" });

// Permission and RolePermission Relationship
Permission.hasMany(RolePermission, { foreignKey: "permissionId" });
RolePermission.belongsTo(Permission, { foreignKey: "permissionId" });

// User and UserRole Relationship
User.hasMany(UserRole, { foreignKey: "userId" });
UserRole.belongsTo(User, { foreignKey: "userId" });

// Role and UserRole Relationship
Role.hasMany(UserRole, { foreignKey: "roleId" });
UserRole.belongsTo(Role, { foreignKey: "roleId" });

// Staff and User Relationship
Staff.hasMany(User, { foreignKey: "staffId" });
User.belongsTo(Staff, { foreignKey: "staffId", as: "staffInfo" });

module.exports = {
  Department,
  Permission,
  Role,
  RolePermission,
  Staff,
  User,
  UserRole,
  sequelize,
};
