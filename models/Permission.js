const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Permission = sequelize.define("Permission", {
  permissionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Permission;
