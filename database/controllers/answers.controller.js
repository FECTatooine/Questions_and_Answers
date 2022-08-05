const { db, Answers } = require('../models');
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
  // Create an Answer
  const questionId = req.query.question_id;
  const answer = {
    question_id: req.body.question_id,
    answer_body: req.body.answer_body,
    answer_date: req.body.answer_date,
    answerer_name: req.body.answerer_name,
    answerer_email: req.body.answerer_email,
  };
  // Save Answer in the database
  sequelize
    .query(
      `INSERT INTO answers (question_id, answer_body, answerer_name, answerer_email, reported, answer_helpfulness)
  VALUES (${questionId}, 'this is a question', 'fakename', 'fakeemail@gmail.com', false, 1);`
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

// Retrieve all Answers from the database for a specific question
exports.findAll = (req, res) => {
  const questionId = req.query.question_id;

  var condition = questionId
    ? { questionId: { question_id: `%${questionId}%` } }
    : null;
  sequelize
    .query(
      `SELECT
    json_build_object(
    'question', to_json(answers.question_id),
    'results', json_build_array(
      json_build_object(
      'answer_id', to_json(answers.answer_id),
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
  FROM questions, answers, answer_photos
  WHERE questions.question_id = ${questionId}
    AND answers.question_id = questions.question_id
    AND answers.answer_id = answer_photos.answer_id`
    )
    .then((data) => {
      let payload = {
        question: questionId,
        page: 1,
        count: 0,
        results: [],
      };

      data[1].rows.forEach((result) => {
        payload.results.push(result.json_build_object.results[0]);
      });
      console.log(payload);
      // console.log(data[1].rows[0].json_build_object.Results);
      // console.log(data[1].rows);
      // console.log(data);
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
