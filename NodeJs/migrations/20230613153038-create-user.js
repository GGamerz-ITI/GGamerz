'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     */
      await queryInterface.createTable('users', { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },      
        username: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        emailVerifiedAt: {
          type: Sequelize.DATE
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        discord: {
          type: Sequelize.STRING,
          allowNull: true
        },
        role: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'user',
        },
        bgColor: {
          type: Sequelize.STRING,
          defaultValue : "rgba(112, 192, 219, 0.527)",
        },
        isBanned: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
    */
     await queryInterface.dropTable('users');
  }
};
