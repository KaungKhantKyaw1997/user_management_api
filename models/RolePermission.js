const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const RolePermission = sequelize.define("RolePermission", {
  roleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Roles",
      key: "roleId",
    },
  },
  permissionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Permissions",
      key: "permissionId",
    },
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = RolePermission;
