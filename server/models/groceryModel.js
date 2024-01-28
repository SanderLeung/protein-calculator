import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db'
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const Grocery = sequelize.define('Grocery', {
  name: DataTypes.STRING,
  protein: DataTypes.FLOAT,
  calories: DataTypes.FLOAT,
  servings: DataTypes.FLOAT,
  cost: DataTypes.FLOAT
}, { 
    timestamps: false
});

export { Grocery };