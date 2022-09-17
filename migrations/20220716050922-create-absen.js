'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Absens', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			EmployeeId: {  allowNull: false,type: Sequelize.INTEGER },
			BranchId: {  allowNull: false,type: Sequelize.INTEGER },
			TypeAbsenId: {  allowNull: false,type: Sequelize.INTEGER },
			date: {  allowNull: false,type: Sequelize.STRING },
			time: {  allowNull: false,type: Sequelize.STRING },
			realLocation: {  type: Sequelize.STRING },
			absenPic: {  type: Sequelize.BLOB },
			typeInput: {  type: Sequelize.STRING },
			statusAbsen: {  allowNull: false,type: Sequelize.STRING, defaultValue: "setuju"  },
			detail: {  type: Sequelize.TEXT },
			amount: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Absens');
	},
};
