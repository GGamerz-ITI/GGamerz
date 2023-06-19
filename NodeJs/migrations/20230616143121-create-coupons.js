'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
    */
    await queryInterface.createTable('Coupons', { 
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
      amount: {
        allowNull: false,
        type: Sequelize.DECIMAL 
      },
      points: {
        type: Sequelize.INTEGER 
      },
      expDate:{
        allowNull: true,
        type: Sequelize.DATE
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     */
     await queryInterface.dropTable('Coupons');

  }
};
