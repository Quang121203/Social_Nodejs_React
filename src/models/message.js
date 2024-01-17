'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.Conversation);
    }
  }
  Message.init({
    conversationID: DataTypes.STRING,
    senderID: DataTypes.STRING,
    text:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};