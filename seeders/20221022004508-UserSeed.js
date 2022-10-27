'use strict';
const { bcryptPass, cekPass } = require('../helper/bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Users', [
        {
        fullname: 'Fathi Ananta',
        username: 'admin_fathi',
        password: bcryptPass('Ananta'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Users', null, {});

  }
};
