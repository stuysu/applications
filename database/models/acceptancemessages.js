'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class acceptanceMessages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  acceptanceMessages.init({
    application: DataTypes.STRING,
    status: DataTypes.ENUM('approved', 'rejected'),
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'acceptanceMessages',
  });
  return acceptanceMessages;
};