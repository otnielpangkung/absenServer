'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('TypeAbsens', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			BranchId: { allowNull: false, type: Sequelize.INTEGER },
			typeName: { allowNull: false, type: Sequelize.STRING },
			timeStart: { allowNull: false, type: Sequelize.STRING },
			timeEnd: { allowNull: false, type: Sequelize.STRING },
			amount: {allowNull: false,type: Sequelize.INTEGER },
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
		await queryInterface.dropTable('TypeAbsens');
	},
};
