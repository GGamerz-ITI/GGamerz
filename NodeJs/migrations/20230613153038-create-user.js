'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     */
      await queryInterface.createTable('Users', { 
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
          type: Sequelize.DATE,
          allowNull: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        discord: {
          type: Sequelize.STRING,
          allowNull: true
        },
        points:{
          allowNull: false,
          type: Sequelize.INTEGER,
          defaultValue: 0,
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
        character: {
          type: Sequelize.STRING,
          defaultValue : "https://res.cloudinary.com/ds5puha49/image/upload/v1687129084/PkBYcGy_jz4ta4.png",
        },
        level: {
          type: Sequelize.STRING,
          defaultValue : "https://res.cloudinary.com/ds5puha49/image/upload/v1687129775/6009637_ow81gz.png",
        },
        isBanned: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
     await queryInterface.dropTable('Users');
  }
};