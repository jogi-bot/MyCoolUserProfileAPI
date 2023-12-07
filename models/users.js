const { DataTypes } = require("sequelize");
const sequelize = require("./sequlize");
const dataTypes = require("sequelize/lib/data-types");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    resetToken: {
      type: DataTypes.INTEGER,
      allowNull:true
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: dataTypes.DATE,
      // allowNull: false,
    },
  },
  {
    // paranoid:true
  }
);

module.exports = User;
