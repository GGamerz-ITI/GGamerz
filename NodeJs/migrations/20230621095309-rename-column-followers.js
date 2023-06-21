'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Followers', 'followerId', 'followingId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Followers', 'followingId', 'followerId');
  }
};