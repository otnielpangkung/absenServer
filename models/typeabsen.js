'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeAbsen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TypeAbsen.hasMany(models.Absen)
      TypeAbsen.belongsTo(models.Branch)
      // define association here
    }
  }
  TypeAbsen.init({
    typeName: DataTypes.STRING,
    BranchId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    timeStart: DataTypes.STRING,
    timeEnd: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TypeAbsen',
  });
  return TypeAbsen;
};