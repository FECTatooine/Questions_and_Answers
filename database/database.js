// Import External Modules
require('dotenv').config();
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize');

// Create variables
const user = process.env.user;
const host = process.env.host;
const database = process.env.database;
const password = process.env.password;
const port = process.env.port;

// Initialize new sequelize object instance
const sequelize = new Sequelize(database, user, password, {
  host: host,
  port: port,
  dialect: 'postgresql',
  operatorAliases: false,
  logging: false,
});

// Test Database Connection
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connection(); // Tests DB Connection

const getQuery = async (table, productId) => {
  if (productId) {
    try {
      console.log('got here');
      return await sequelize.query(
        `SELECT * FROM '${table}' WHERE product_id = ${productId}`,
        { type: QueryTypes.SELECT }
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      return await sequelize.query(`SELECT * FROM '${table}'`, {
        type: QueryTypes.SELECT,
      });
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = {
  sequelize,
  Sequelize,
  getQuery,
};
