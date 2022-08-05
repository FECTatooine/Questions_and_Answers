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
  const productId = req.query.product_id;
  const question = {
    product_id: req.body.product_id,
    question_body: req.body.question_body,
    question_date: req.body.question_date,
    asker_name: req.body.asker_name,
    asker_email: req.body.asker_email,
  };
  // Save Question in the database
  sequelize
    .query(
      `INSERT INTO questions (product_id, question_body, asker_name, asker_email, reported, question_helpfulness)
  VALUES (${productId}, 'this is a question', 'fakename', 'fakeemail@gmail.com', false, 1);`
    )
    .then((data) => {
      console.log(data);
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
  console.log(productId);
  var condition = productId
    ? { productId: { product_id: `%${productId}%` } }
    : null;
  sequelize
    .query(
      `SELECT
      json_build_object(
      'Product Id', to_json(questions.product_id),
      'Results', json_build_array(
        json_build_object(
        'question_id', to_json(questions.question_id),
        'question_body', to_json(questions.question_body),
        'question_date', to_json(questions.question_date),
        'asker_name', to_json(questions.asker_name),
        'question_helpfulness', to_json(questions.question_helpfulness),
        'reported', to_json(questions.reported),
        'answers', json_build_object(
          answers.answer_id, json_build_object (
            'id', to_json(answers.answer_id),
            'body', to_json(answers.answer_body),
          'date', to_json(answers.answer_date),
          'answerer_name', to_json(answers.answerer_name),
          'helpfulness', to_json(answers.answer_helpfulness),
          'photos', json_build_array(
            json_build_object (
              'id', to_json(answer_photos.photo_id),
            'url', to_json(answer_photos.url)
              )
            )
            )
          )
        )
        )
      )
    FROM questions, answers, answer_photos
    WHERE questions.product_id = ${productId}
      AND answers.question_id = questions.question_id
      AND answers.answer_id = answer_photos.answer_id`
    )
    .then((data) => {
      let payload = {
        product_id: productId,
        results: [],
      };

      data[1].rows.forEach((result) => {
        payload.results.push(result.json_build_object.Results[0]);
      });
      console.log(payload);
      // console.log(data[1].rows[0].json_build_object);
      // console.log(data[1].rows);
      res.send(payload);
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
