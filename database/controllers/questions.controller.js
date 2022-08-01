const { db, Questions } = require('../models');
const { Sequelize, sequelize } = require('../database.js');
const Op = db.Sequelize.Op;

// Create and Save a new Question
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  // Create a Question
  const question = {
    product_id: req.body.product_id,
    question_body: req.body.question_body,
    question_date: req.body.question_date,
    asker_name: req.body.asker_name,
    asker_email: req.body.asker_email,
  };
  // Save Question in the database
  Questions.create(question)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Question.',
      });
    });
};

// Retrieve all Questions from the database.
exports.findAll = (req, res) => {
  const productId = req.query.product_id;
  var condition = productId
    ? { productId: { product_id: `%${product_id}%` } }
    : null;
  sequelize
    .query('SELECT * FROM questions WHERE product_id = 2')
    .then((data) => {
      console.log(JSON.stringify(data));
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Questions.',
      });
    });
};

// Find a single Question with an id
exports.findOne = (req, res) => {
  console.log('help');
  const id = req.params.id;
  Questions.findOne({ where: { product_id: '2' } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Question with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Question with id=' + id,
      });
    });
};

// Update a Question by the id in the request
exports.update = (req, res) => {};

// Delete a Question with the specified id in the request
exports.delete = (req, res) => {};
// Delete all Questions from the database.
exports.deleteAll = (req, res) => {};
// Find all published Questions
exports.findAllPublished = (req, res) => {};
