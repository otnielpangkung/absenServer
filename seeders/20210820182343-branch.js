'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Branches', [
      {
        id: 1,
        branchName: 'Tanjung',
        rekNumber: 'Mandiri 797029721',
        latitude: '-5.090982',
        longitude: '119.495803',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        branchName: 'Kima',
        rekNumber: 'BCA 4321213',
        latitude: '-5.090928836338985',
        longitude: '119.495846170228353',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        branchName: 'Pangkep',
        rekNumber: 'BCA 4321213',
        latitude: '-4.826831144619102',
        longitude: '119.54829976837839',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        branchName: 'Gorontalo',
        rekNumber: 'BNI 67321213',
        latitude: '0.6534308012520126',
        longitude: '123.08647751069792',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        branchName: 'Mamuju',
        rekNumber: 'BCA 4321213',
        latitude: '-2.0796722368734244',
        longitude: '119.377386218911',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        branchName: 'Wolo',
        rekNumber: 'BCA 4321213',
        latitude: '-3.8406679002292163',
        longitude: ' 121.30883960000003',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        branchName: 'Bekasi',
        rekNumber: 'BCA 4321213',
        latitude: '-6.159921893202707',
        longitude: '107.04549582605549',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        branchName: 'Kendari',
        rekNumber: 'BCA 4321213',
        latitude: '-3.9915554176811754',
        longitude: '122.56101229999999',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        branchName: 'Tes Cabang',
        rekNumber: 'BCA 4321213',
        latitude: '-8.600758',
        longitude: '116.075910',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);

  },

  down: async (queryInterface, Sequelize) => {


    await queryInterface.bulkDelete('Branches', null, {});

  }
};
