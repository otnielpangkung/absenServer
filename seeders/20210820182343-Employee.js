'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Employees', [
      {
        "id": 1,
        "username": "burhan",
        "employeeName": "burhan",
        "password":"admin",
        "position": "staff admin",
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 2,
        "username": "aco",
        "employeeName": "aco",
        "password":"admin",
        "position": "staff admin",
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 3,
        "username": "bondan",
        "employeeName": "bondan",
        "password":"admin",
        "position": "staff admin",
      createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ]);

  },

  down: async (queryInterface, Sequelize) => {


    await queryInterface.bulkDelete('Employees', null, {});

  }
};
