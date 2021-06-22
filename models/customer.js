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
    dni: DataTypes.INTEGER,
    birthdate: DataTypes.DATE,
    phone: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};