"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Wallets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "user_id",
        },
      },
      wallet_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      wallet_balance: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      net_asset: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      savings: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      returns: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      investments: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,
        defaultValue: 0,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Wallets");
  },
};
