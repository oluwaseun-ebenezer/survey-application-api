const express = require('express');

const answerRoute = require('./routes/answer');
const questionRoute = require('./routes/question');
const surveyRoute = require('./routes/survey');
const responseRoute = require('./routes/response');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/answer', answerRoute);
app.use('/question', questionRoute);
app.use('/survey', surveyRoute);
app.use('/response', responseRoute);

module.exports = app;
