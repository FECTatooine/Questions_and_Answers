// External Modules
require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

// System Variables
const port = process.env.server_port || 3000;

// Middleware
// Body Data
app.use(express.json());

// Serves Static Files
app.use(express.static(path.join(__dirname, '../database')));

// Custom Request Logging Middleware
app.use((req, res, next) => {
  console.log(
    `*=== \x1b[34mNew Request Logged:\x1b[0m Type: \x1b[33m${req.method}\x1b[0m REQUEST, URL: \x1b[33m${req.url}\x1b[0m ===*`
  );
  next();
});

// Initialize Server
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
