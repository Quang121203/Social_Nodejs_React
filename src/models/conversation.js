'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Conversation.init({
    userID1: DataTypes.STRING,
    userID2: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};