module.exports = (app) => {
  const questions = require('../database/controllers/questions.controller.js');
  var router = require('express').Router();
  // Gets all questions for a specific product
  router.get('/:id', questions.findAll);
  // Posts a new question for a specific product
  router.post('/Question/:id', questions.create);
  // Updates Helpfullness of a Question
  router.put('/helpful:id', questions.helpful);

  // Default Questions URL prefix
  app.use('/qa/questions', router);
};
