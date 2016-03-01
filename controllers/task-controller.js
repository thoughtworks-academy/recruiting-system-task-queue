'use strict';

var client = require('../models/index');
var request = require('superagent');
var async = require('async');
var yamlConfig = require('node-yaml-config');
var config = yamlConfig.load('./config/config.yml');
var httpCode = require('../mixin/constant').httpCode;

function TaskController () {}

TaskController.prototype.createTask = (req, res) => {
  var recordName = 'homework_' + req.body.userId + '_' + req.body.homeworkId;
  client.set(recordName, JSON.stringify(req.body));

  var createJobStr = config.CIServer + '/job/' + config.jobName + '/buildWithParameters';
  var callbackURL = config.taskServer + ':' + config.port + '/tasks/' + recordName + '/completion';

  request
    .post(createJobStr)
    .set('Content-Type', 'application/json')
    .query({
      USER_REPO: req.body.userAnswerRepo,
      CALLBACK_URL: callbackURL,
      BRANCH: req.body.branch,
      EVALUATE_SCRIPT_URL: req.body.evaluateScript
    })
    .end((err, response) => {
      if (err){
        res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
      }else {
        res.send({
          status: httpCode.OK
        });
      }
    });
};

TaskController.prototype.result = (req, res) => {
  var userHomeworkQuiz;

  async.waterfall([
    (done) => {
      client.get(req.params.homeworkName, (err, reply) => {
        done(err, reply);
      });
    },
    (reply, done) => {
      userHomeworkQuiz = JSON.parse(reply);

      client.del(req.params.homeworkName, done);
    },
    (reply, done) =>{
      request
        .post(userHomeworkQuiz.callbackURL)
        .set('Content-Type', 'application/json')
        .send({
          result: req.body.result,
          jobName: req.body.jobName,
          buildNumber: req.body.buildNumber
        })
        .end(done);
    }
  ],(err, result) => {
    if(err) {
      res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
    }else {
      res.send({
        status: httpCode.OK
      });
    }
  });
};

module.exports = TaskController;