'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class results extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  results.init({
    code: DataTypes.STRING,
    positions: DataTypes.STRING,
    status: DataTypes.ENUM('approved', 'rejected'),
    application: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'results',
  });
  return results;
};