"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_addresses", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      address_line: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      zip: {
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      created_at: {
        type: "TIMESTAMPTZ",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: "TIMESTAMPTZ",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: "TIMESTAMPTZ",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_addresses");
  },
};
