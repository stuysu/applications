'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class userCodes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	userCodes.init(
		{
			applicationId: DataTypes.INTEGER,
			subHash: DataTypes.STRING,
			code: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'userCodes'
		}
	);
	return userCodes;
};
