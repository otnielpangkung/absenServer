'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('TypeAbsens', [
      {
        "id": 1,
        "BranchId": 1,
        "typeName": "Makan Siang",
        "timeStart": "12:00",
        "timeEnd": "16:00",
        "amount": 13000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 2,
        "BranchId": 1,
        "typeName": "Makan Malam",
        "timeStart": "18:00",
        "timeEnd": "22:00",
        "amount": 13000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 3,
        "BranchId": 1,
        "typeName": "Makan Tengah Malam",
        "timeStart": "00:00",
        "timeEnd": "04:00",
        "amount": 13000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 4,
        "BranchId": 2,
        "typeName": "Makan Siang",
        "timeStart": "12:00",
        "timeEnd": "16:00",
        "amount": 13000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 5,
        "BranchId": 2,
        "typeName": "Makan Malam",
        "timeStart": "18:00",
        "timeEnd": "22:00",
        "amount": 13000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 6,
        "BranchId": 2,
        "typeName": "Makan Tengah Malam",
        "timeStart": "00:00",
        "timeEnd": "04:00",
        "amount": 13000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 7,
        "BranchId": 3,
        "typeName": "Sarapan",
        "timeStart": "06:00",
        "timeEnd": "10:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 8,
        "BranchId": 3,
        "typeName": "Makan Siang",
        "timeStart": "12:00",
        "timeEnd": "16:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 9,
        "BranchId": 3,
        "typeName": "Makan Malam",
        "timeStart": 18,
        "timeEnd": 22,
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 10,
        "BranchId": 3,
        "typeName": "Makan Tengah Malam",
        "timeStart": "00:00",
        "timeEnd": "04:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 11,
        "BranchId": 4,
        "typeName": "Sarapan",
        "timeStart": "06:00",
        "timeEnd": "10:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 12,
        "BranchId": 4,
        "typeName": "Makan Siang",
        "timeStart": "12:00",
        "timeEnd": "16:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 13,
        "BranchId": 4,
        "typeName": "Makan Malam",
        "timeStart": "18:00",
        "timeEnd": "22:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 14,
        "BranchId": 4,
        "typeName": "Makan Tengah Malam",
        "timeStart": "00:00",
        "timeEnd": "04:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 15,
        "BranchId": 5,
        "typeName": "Sarapan",
        "timeStart": "06:00",
        "timeEnd": "10:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 16,
        "BranchId": 5,
        "typeName": "Makan Siang",
        "timeStart": "12:00",
        "timeEnd": "16:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 17,
        "BranchId": 5,
        "typeName": "Makan Malam",
        "timeStart": "18:00",
        "timeEnd": "22:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 18,
        "BranchId": 5,
        "typeName": "Makan Tengah Malam",
        "timeStart": "00:00",
        "timeEnd": "04:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 19,
        "BranchId": 6,
        "typeName": "Sarapan",
        "timeStart": "06:00",
        "timeEnd": "10:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 20,
        "BranchId": 6,
        "typeName": "Makan Siang",
        "timeStart": "12:00",
        "timeEnd": "16:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 21,
        "BranchId": 6,
        "typeName": "Makan Malam",
        "timeStart": "18:00",
        "timeEnd": "22:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 22,
        "BranchId": 6,
        "typeName": "Makan Tengah Malam",
        "timeStart": "00:00",
        "timeEnd": "04:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 23,
        "BranchId": 7,
        "typeName": "Sarapan",
        "timeStart": "06:00",
        "timeEnd": "10:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 24,
        "BranchId": 7,
        "typeName": "Makan Siang",
        "timeStart": "12:00",
        "timeEnd": "16:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 25,
        "BranchId": 7,
        "typeName": "Makan Malam",
        "timeStart": "18:00",
        "timeEnd": "22:00",
        "amount": 16000,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 26,
        "BranchId": 7,
        "typeName": "Makan Tengah Malam",
        "timeStart": "00:00",
        "timeEnd": "04:00",
        "amount": 16000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

  },

  down: async (queryInterface, Sequelize) => {


    await queryInterface.bulkDelete('TypeAbsens', null, {});

  }
};
