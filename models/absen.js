'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Absen extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Absen.belongsTo(models.Branch);
			Absen.belongsTo(models.Employee);
			Absen.belongsTo(models.TypeAbsen);

			// define association here
		}
	}
	Absen.init(
		{
			EmployeeId: DataTypes.INTEGER,
			BranchId: DataTypes.INTEGER,
			TypeAbsenId: DataTypes.INTEGER,
			date: DataTypes.STRING,
			time: DataTypes.STRING,
			realLocation: DataTypes.STRING,
			typeInput: DataTypes.STRING,
			statusAbsen: DataTypes.STRING,
			detail: DataTypes.TEXT,
			absenPic: DataTypes.STRING,
			amount: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Absen',
		}
	);
	return Absen;
};
