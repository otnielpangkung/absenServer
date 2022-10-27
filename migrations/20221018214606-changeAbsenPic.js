'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Absens', 'absenPic', {
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    ;
  }
};