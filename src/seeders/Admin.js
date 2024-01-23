'use strict';
const userServices = require('../services/userServices');

const password = userServices.hashPass("123456");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('User', [{
      email: 'admin@gmail.com',
      username: 'admin',
      password: password,
      isAdmin: true
    }], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
