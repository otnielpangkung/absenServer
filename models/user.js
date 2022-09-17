'use strict';
const { Model } = require('sequelize');
const { bcryptPass, cekPass } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			fullname: DataTypes.STRING,
			username: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
			hooks: {
				beforeCreate(user) {
					user.password = bcryptPass(user.password);
				},
			},
		}
	);
	return User;
};
