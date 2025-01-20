'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', { // ✅ Match table name with the model
      id: {
        allowNull: false,
        autoIncrement: true, // ✅ Matches model
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // ✅ Matches model
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // ✅ Matches model
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // ✅ Matches model
        validate: {
          isEmail: true, // ✅ Matches model
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bio: {
        type: Sequelize.TEXT, // ✅ Changed from STRING to TEXT
        allowNull: true, // ✅ Matches model
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
    await queryInterface.dropTable('users'); // ✅ Matches table name in model
  },
};
