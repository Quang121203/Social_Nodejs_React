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
    followers:  {
      type: DataTypes.STRING,
      get() {
        const stringValue = this.getDataValue('followers');
        return stringValue ? stringValue.split(',') : [];
      },
      set(value) {
        const arrayValue = value ? value.join(',') : '';
        this.setDataValue('followers', arrayValue);
      },
    },
    followings:  {
      type: DataTypes.STRING,
      get() {
        const stringValue = this.getDataValue('followings');
        return stringValue ? stringValue.split(',') : [];
      },
      set(value) {
        const arrayValue = value ? value.join(',') : '';
        this.setDataValue('followings', arrayValue);
      },
    },
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