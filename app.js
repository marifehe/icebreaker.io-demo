'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false } ));
app.use('/public', express.static(path.join(__dirname, 'bin/public')));

// set express routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'bin/index.html'));
});


module.exports = app;