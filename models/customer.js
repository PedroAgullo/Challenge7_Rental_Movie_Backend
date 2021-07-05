'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Order,{
        foreignKey:'customerId'
      });
    }
  };
  Customer.init({
    name: DataTypes.STRING,
    lastName1: DataTypes.STRING,
    lastName2: DataTypes.STRING,
    birthdate: DataTypes.DATEONLY,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN,
    lastSearch: DataTypes.INTEGER,
    lastPlay: DataTypes.INTEGER,
    token: DataTypes.STRING,
    premium: DataTypes.BOOLEAN,
    infantil: DataTypes.BOOLEAN,
    pinParental: DataTypes.STRING,
    ccNumber: DataTypes.STRING,
    ccName: DataTypes.STRING,
    ccDate: DataTypes.DATE,
    ccCode: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};