'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Employees', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			employeeName: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING,
			},
			position: {
				type: Sequelize.STRING,
			},
			username: { allowNull: false, unique: true, type: Sequelize.STRING },
			password: { allowNull: false, type: Sequelize.STRING },
			status: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable('Employees');
	},
};
