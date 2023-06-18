'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
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
      },
      tags:{
        type:Sequelize.JSON
      },
      types:{
        type:Sequelize.JSON
      },
      os:{
        type:Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Games');

  }
};
