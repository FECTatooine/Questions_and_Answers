module.exports = (app) => {
  const questions = require('../database/controllers/questions.controller.js');
  var router = require('express').Router();
  // Create a new Question
  router.post('/', questions.create);
  // Retrieve all questions
  router.get('/', questions.findAll);
  // Retrieve all published questions
  router.get('/published', questions.findAllPublished);
  // Retrieve a single Question with id
  router.get('/:id', questions.findOne);
  // Update a Question with id
  router.put('/:id', questions.update);
  // Delete a Question with id
  router.delete('/:id', questions.delete);
  // Create a new Question
  router.delete('/', questions.deleteAll);
  app.use('/api/questions', router);
};
