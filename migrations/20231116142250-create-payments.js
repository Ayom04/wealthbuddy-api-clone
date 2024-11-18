"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      payment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      payment_status: {
        type: Sequelize.ENUM,
        values: ["pending", "fulfilled"],
        defaultValue: "pending",
      },
      amount: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "user_id",
        },
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable("Payments");
  },
};
