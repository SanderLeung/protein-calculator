const { DataTypes } = require('sequelize');

const sequelize = require("../config/database");

const Grocery = sequelize.define('Grocery', {
  name: DataTypes.STRING,
  protein: DataTypes.FLOAT,
  calories: DataTypes.FLOAT,
  servings: DataTypes.FLOAT,
  cost: DataTypes.FLOAT
}, { 
    timestamps: false
}, {
    validate: {
        notNull: true
    }
});

module.exports = Grocery;