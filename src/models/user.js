'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post);
    }
  }
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    coverPicture: DataTypes.STRING,
    followers: DataTypes.STRING,
    followings: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    desc: DataTypes.STRING,
    city: DataTypes.STRING,
    from: DataTypes.STRING,
    relationship: DataTypes.ENUM('1', '2', '3')
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};