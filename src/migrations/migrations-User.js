'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      profilePicture: {
        type: Sequelize.STRING,
      },
      coverPicture: {
        type: Sequelize.STRING,
      },
      followers: {
        type: Sequelize.STRING,
        get() {
          const stringValue = this.getDataValue('followers');
          return stringValue ? rawValue.split(',') : null;
        },
        set(value) {
          const arrayValue = value ? value.join(',') : '';
          this.setDataValue('followers', arrayValue);
        },
      },
      followings: {
        type: Sequelize.STRING,
        get() {
          const stringValue = this.getDataValue('followings');
          return stringValue ? rawValue.split(',') : null;
        },
        set(value) {
          const arrayValue = value ? value.join(',') : '';
          this.setDataValue('followings', arrayValue);
        },
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      desc: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      from: {
        type: Sequelize.STRING,
      },
      relationship: {
        type: Sequelize.ENUM('1', '2', '3'),
        defaultValue: '1',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};