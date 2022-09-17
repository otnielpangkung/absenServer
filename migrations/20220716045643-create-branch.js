'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Branches', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			branchName: { allowNull: false,unique:true, type: Sequelize.STRING },
			rekNumber: { allowNull: false, type: Sequelize.STRING },
			latitude: {  type: Sequelize.STRING },
			longitude: {  type: Sequelize.STRING },
			detail: {
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
		await queryInterface.dropTable('Branches');
	},
};
