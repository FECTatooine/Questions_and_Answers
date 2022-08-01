const { db, Questions } = require('../models');
const { Sequelize, sequelize } = require('../database.js');
const Op = db.Sequelize.Op;

// Create and Save a new Question
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: 'Content can not be empty!',
  //   });
  //   return;
  // }
  // Create a Question // maybe look at the schema here to confirm
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

// Retrieve all Questions from the database for a specific product
exports.findAll = (req, res) => {
  const productId = req.query.product_id;
  var condition = productId
    ? { productId: { product_id: `%${productId}%` } }
    : null;
  sequelize
    .query(
      `SELECT row_to_json(questions)
    FROM (
      SELECT
      *,
      (
        SELECT jsonb_agg(answers)
        FROM (
        SELECT
          *,
          (
            SELECT jsonb_agg(answer_photos)
            FROM (
            SELECT
              *
              FROM answer_photos
              WHERE answers.answer_id = answer_id
            ) as answer_photos
          ) as answer_photos
          FROM answers
          WHERE questions.question_id = question_id
        ) as answers
      ) as answers
        FROM questions
      WHERE product_id = ${productId}
    ) as questions`
    )
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Questions.',
      });
    });
};

// Updates Helpfullness of a Question
exports.helpful = (req, res) => {};
