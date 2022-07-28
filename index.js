// Import External Modules
require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize');

// Create variables
const user = process.env.user;
const host = process.env.host;
const database = process.env.database;
const password = process.env.password;
const port = process.env.port;

// Initialize new sequelize object instance
const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  logging: false,
});

// Test Database Connection
const connection = async () => {
  console.log('attempt');
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    //console.error('Unable to connect to the database:', error);
    let sillyworkaround = JSON.stringify(error.original.code);
    console.log(sillyworkaround);
    if ((sillyworkaround = '3D000')) {
      console.log('got here');
      sequelize.query(`create database ${database}`);
    }
  }
};

connection();

// Create new Models
// const Questions = new Model();
// const Answers = new Model();

// // Create new Tables
// Questions.init({
//   question_id: {
//     type: DataTypes.BIGSERIAL,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   question_body: {
//     type: DataTypes.VARCHAR,
//   },
//   question_date: {
//     type: DataTypes.TIMESTAMP,
//   },
//   asker_name: {
//     type: DataTypes.VARCHAR,
//   },
//   question_helpfulness: {
//     type: INTEGER,
//   },
//   reported: {
//     type: DataTypes.BOOLEAN,
//   },
//   answer_id: {
//     type: DataTypes.BIGSERIAL,
//   },
// });

// Answers.init({
//   answer_id: {
//     type: DataTypes.BIGSERIAL,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   body: {
//     type: DataTypes.VARCHAR,
//   },
//   date: {
//     type: DataTypes.TIMESTAMP,
//   },
//   answerer_name: {
//     type: DataTypes.VARCHAR,
//   },
//   helpfulness: {
//     type: DataTypes.INTEGER,
//   },
//   photos: {
//     type: DataTypes.VARCHAR,
//   },
// });

// // Add Foreign Key to Answers Table (one to many relationship)
// Answers.belongsTo(Questions, {
//   foreignKey: 'question_id',
//   targetKey: 'question_id',
// });
