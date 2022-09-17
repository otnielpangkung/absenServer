'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Branches', [
      {
        id: 1,
        branchName: 'Tanjung',
        rekNumber: 'Mandiri 797029721',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        branchName: 'Kima',
        rekNumber: 'BCA 4321213',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        branchName: 'Pangkep',
        rekNumber: 'BCA 4321213',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        branchName: 'Gorontalo',
        rekNumber: 'BNI 67321213',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        branchName: 'Mamuju',
        rekNumber: 'BCA 4321213',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        branchName: 'Wolo',
        rekNumber: 'BCA 4321213',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        branchName: 'Bekasi',
        rekNumber: 'BCA 4321213',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

  },

  down: async (queryInterface, Sequelize) => {


    await queryInterface.bulkDelete('Branches', null, {});

  }
};
