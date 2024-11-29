const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Staff = sequelize.define("Staff", {
  staffId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  joinedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  depId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Departments",
      key: "depId",
    },
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Staff;
