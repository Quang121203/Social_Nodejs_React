'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Post', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER
      },   
      like: {
        type: Sequelize.STRING,
        defaultValue:'',
        get() {
          const stringValue = this.getDataValue('like');
          return stringValue ? stringValue.split(',') : [];
        },
        set(value) {
          const arrayValue = value ? value.join(',') : '';
          this.setDataValue('like', arrayValue);
        },
      },
      desc: {
        type: Sequelize.STRING,
      },
      img: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Post');
  }
};