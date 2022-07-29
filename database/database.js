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
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connection(); // Tests DB Connection

// Create new Models
const Questions = new Model(); // fix schema based on docs
const Answers = new Model();

// Create new schema
questions.init({
  question_id: {
    type: DataTypes.BIGSERIAL,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.BIGINT,
  }
  question_body: {
    type: DataTypes.VARCHAR,
  },
  question_date: {
    type: DataTypes.BIGINT,
  },
  asker_name: {
    type: DataTypes.VARCHAR,
  },
  asker_email: {
    type: DataTypes.VARCHAR,
  },
  reported: {
    type: DataTypes.BOOLEAN,
  },
  question_helpfulness: {
    type: INTEGER,
  },
});

answers.init({
  answer_id: {
    type: DataTypes.BIGSERIAL,
    autoIncrement: true,
    primaryKey: true,
  },
  question_id: {
    type: DataTypes.BIGINT,
  },
  question_body: {
    type: DataTypes.VARCHAR,
  },
  question_date: {
    type: DataTypes.BIGINT,
  },
  answerer_name: {
    type: DataTypes.VARCHAR,
  },
  answerer_email: {
    type: DataTypes.VARCHAR,
  },
  reported: {
    type: DataTypes.BOOLEAN,
  },
  question_helpfulness: {
    type: DataTypes.INTEGER,
  },
});

answer_photos.init({
  photo_id: {
    type: DataTypes.BIGSERIAL,
    autoIncrement: true,
    primaryKey: true,
  },
  answer_id: {
    type: DataTypes.BIGINT,
  },
  url: {
    type: DataTypes.VARCHAR,
  },
})

// Add Foreign Keys
answers.belongsTo(questions, {
  foreignKey: 'question_id',
  targetKey: 'question_id',
});

answer_photos.belongsTo(answers, {
  foreignKey: 'answer_id',
  targetKey: 'answer_id',
});
