'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Branch extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Branch.hasMany(models.Absen);
			Branch.hasMany(models.TypeAbsen);
			// define association here
		}
	}
	Branch.init(
		{
			branchName: DataTypes.STRING,
			rekNumber: DataTypes.STRING,
			latitude: DataTypes.STRING,
			longitude: DataTypes.STRING,
			detail: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Branch',
		}
	);
	return Branch;
};
