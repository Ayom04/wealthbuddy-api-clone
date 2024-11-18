"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      user_id: DataTypes.UUID,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      is_verified: DataTypes.BOOLEAN,
      gender: DataTypes.ENUM("male", "female", "others"),
      password_hash: DataTypes.STRING,
      password_salt: DataTypes.STRING,
      bvn: DataTypes.STRING,
      referral_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
