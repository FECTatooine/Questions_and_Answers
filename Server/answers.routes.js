module.exports = (app) => {
  const answers = require('../database/controllers/answers.controller.js');
  var router = require('express').Router();
  // Gets all answers for a specific product
  router.get('/:id/answers', answers.findAll);
  // Posts a new question for a specific product
  router.post('/:id/answers', answers.create);
  // Updates Helpfullness of a Question
  router.put('/answer/:id/helpful', answers.helpful);

  // Default answers URL prefix
  app.use('/qa', router);
};
