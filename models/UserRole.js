const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const UserRole = sequelize.define("UserRole", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Users",
      key: "userId",
    },
  },
  roleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Roles",
      key: "roleId",
    },
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = UserRole;
