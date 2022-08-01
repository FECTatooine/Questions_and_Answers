'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Create new Models
const Questions = sequelize.define('questions', {
  question_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.BIGINT,
  },
  question_body: {
    type: DataTypes.STRING,
  },
  question_date: {
    type: DataTypes.BIGINT,
  },
  asker_name: {
    type: DataTypes.STRING,
  },
  asker_email: {
    type: DataTypes.STRING,
  },
  reported: {
    type: DataTypes.BOOLEAN,
  },
  question_helpfulness: {
    type: DataTypes.INTEGER,
  },
});

const Answers = sequelize.define('answers', {
  answer_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  question_id: {
    type: DataTypes.BIGINT,
  },
  question_body: {
    type: DataTypes.STRING,
  },
  question_date: {
    type: DataTypes.BIGINT,
  },
  answerer_name: {
    type: DataTypes.STRING,
  },
  answerer_email: {
    type: DataTypes.STRING,
  },
  reported: {
    type: DataTypes.BOOLEAN,
  },
  question_helpfulness: {
    type: DataTypes.INTEGER,
  },
});

const AnswerPhotos = sequelize.define('answer_photos', {
  photo_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  answer_id: {
    type: DataTypes.BIGINT,
  },
  url: {
    type: DataTypes.STRING,
  },
});

// Add Foreign Keys
Answers.belongsTo(Questions, {
  foreignKey: 'question_id',
  targetKey: 'question_id',
});

AnswerPhotos.belongsTo(Answers, {
  foreignKey: 'answer_id',
  targetKey: 'answer_id',
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.questions = require('../models/index.js');

module.exports = {
  db,
  Questions,
  Answers,
  AnswerPhotos,
};
