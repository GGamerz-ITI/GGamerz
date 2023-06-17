'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example: */
     await queryInterface.createTable('revenue', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        type: Sequelize.STRING
      },
      price:{
        type: Sequelize.FLOAT
      },
      tags:{
        type: Sequelize.JSON

      },
      dateSold:{
        type: Sequelize.DATE
      }
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     **/
    await queryInterface.dropTable('revenue');
     
  }
};
