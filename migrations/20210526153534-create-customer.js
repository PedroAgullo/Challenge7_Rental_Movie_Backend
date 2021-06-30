'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      lastName1: {
        type: Sequelize.STRING
      },
      lastName2: {
        type: Sequelize.STRING
      },
      dni: {
        type: Sequelize.STRING,
        unique:true
      },
      birthdate: {
        type: Sequelize.DATEONLY
      },
      phone: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      postalCode: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      token:{
        type: Sequelize.STRING,
        defaultValue: ""
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isActive:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      premium:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      lastSearch: {
        type: Sequelize.STRING,
        defaultValue : 0
      },
      lastPlay: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },     
      infantil:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      pinParental:{
        type: Sequelize.STRING,
        defaultValue: ""
      },
      ccNumber:{
        type: Sequelize.STRING,
        defaultValue: ""
      },
      ccName:{
        type: Sequelize.STRING,
        defaultValue: ""
      },
      ccDate:{
        type: Sequelize.DATE
      },
      ccCode:{
        type: Sequelize.STRING,
        defaultValue: ""
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
    await queryInterface.dropTable('Customers');
  }
};