'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var redis = require('redis');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.post('/tasks', (req, res) => {
  var client = redis.createClient({
    host: '192.168.99.100',
    port: 6379
  });

  client.set('homework_' + req.body.userId + '_' + req.body.quizId, JSON.stringify(req.body));

  res.send({
    status: 200
  });
});

app.post('/task-result', (req, res) => {});

var port = 4000;

app.listen(port, function () {
  console.log('App listening at http://localhost:' + port);
});

module.exports = app;
