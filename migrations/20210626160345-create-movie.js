'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      movieId: {
        type: Sequelize.INTEGER
      },
      numBuy: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      numRent: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      numPlay: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      poster_path:{
        type: Sequelize.STRING,
      },
      lastSearch: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      lastPlay: {
        type: Sequelize.INTEGER,
        defaultValue : 0
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movies');
  }
};