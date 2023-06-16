'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('games', {
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
      price: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      releaseDate: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      character: {
        type: Sequelize.STRING,
      },
      images:{
        type:Sequelize.JSON
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('games');

  }
};
