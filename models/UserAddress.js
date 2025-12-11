"use strict";
const { Model } = require("sequelize");
const { database } = require("../config/config");
const User = require("./User");
module.exports = (sequelize, DataTypes) => {
  class UserAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserAddress.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  UserAddress.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      address_line: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      zip: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserAddress",
    },
  );
  return UserAddress;
};
