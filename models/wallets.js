"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wallets.init(
    {
      user_id: DataTypes.STRING,
      wallet_id: DataTypes.STRING,
      investments: DataTypes.DOUBLE(10, 2),
      wallet_balance: DataTypes.DOUBLE(10, 2),
      returns: DataTypes.DOUBLE(10, 2),
      savings: DataTypes.DOUBLE(10, 2),
      net_asset: DataTypes.DOUBLE(10, 2),
    },
    {
      sequelize,
      modelName: "Wallets",
    }
  );
  return Wallets;
};
