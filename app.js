'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var redis = require('redis');
var yamlConfig = require('node-yaml-config');

var config = yamlConfig.load('./config/config.yml');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.post('/tasks', (req, res) => {
  var client = redis.createClient({
    host: config.redisServerIp,
    port: config.redisServerPort
  });

  client.set('homework_' + req.body.userId + '_' + req.body.quizId, JSON.stringify(req.body));

  res.send({
    status: 200
  });
});

app.post('/task-result', (req, res) => {});

app.listen(config.port, function () {
  console.log('App listening at http://localhost:' + config.port);
});

module.exports = app;
