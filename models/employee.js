'use strict';
const { Model } = require('sequelize');
const { bcryptPass, cekPass } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
	class Employee extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Employee.hasMany(models.Absen);
			// define association here
		}
	}
	Employee.init(
		{
			employeeName: DataTypes.STRING,
			position: DataTypes.STRING,
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			status: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Employee',
			// hooks: {
			// 	beforeCreate(employee) {
			// 		employee.password = bcryptPass(employee.password);
			// 	},
			// },
		}
	);
	return Employee;
};
