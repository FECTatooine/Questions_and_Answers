// External Modules
require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');

// Internal Modules
const { Sequelize, sequelize, getQuery } = require('../database/database.js');

const app = express();

// System Variables
const port = process.env.server_port || 8080;

// Middleware
// Body Data
app.use(express.json());

// Serves Static Files
app.use(express.static(path.join(__dirname, '../database')));

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

// Custom Request Logging Middleware
app.use((req, res, next) => {
  console.log(
    `*=== \x1b[34mNew Request Logged:\x1b[0m Type: \x1b[33m${req.method}\x1b[0m REQUEST, URL: \x1b[33m${req.url}\x1b[0m ===*`
  );
  next();
});

// Initialize Server
require('./questions.routes')(app);
require('./answers.routes')(app);
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

// Default Route
app.get('/', (req, res) => {
  res.json({
    message:
      'Hello from the friendly API server,  this route doesnt do anything but we are happy you are here!',
  });
});
