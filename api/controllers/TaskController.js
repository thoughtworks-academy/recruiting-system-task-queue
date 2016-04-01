'use strict';

var request = require('superagent');
var async = require('async');
var yamlConfig = require('node-yaml-config');
var config = yamlConfig.load('./api/config/config.yml');
var constant = require('../mixin/constant');

function updateTask(req, res) {
  async.waterfall([
    (done) => {
      var uniqId = req.params.uniqId;
      Task.update(uniqId, req.body).exec(done);
    },
    (data, done) => {
      request.post(data.callbackURL)
          .set('Content-Type', 'application/json')
          .send(data)
          .end(done);
    }
  ], function (err, data){
    res.send(data);
  });
}

function filterTask(req, res) {
  //return res.send(JSON.parse(req.query.filter));
  var filter = JSON.parse(req.query.filter);
  Task.find().where(filter).exec((err, data) => {
    res.send(data);
  });
}

function findOneTask(req, res) {
  Task.findOne({id: req.params.uniqId}).exec((err, record) => {
    res.send(record);
  });
}

function createTask(req, res) {
  var uniqId;
  async.waterfall([
    (done) => {
      Task.create(req.body).exec(done)
    },
    (result, done) => {
      uniqId = result.id;
      var createJobStr = config.CIServer + '/job/' + config.jobName + '/buildWithParameters';
      var callbackURL = config.taskServer + '/tasks/' + uniqId;

      request
          .post(createJobStr)
          .set('Content-Type', 'application/json')
          .query({
            USER_REPO: req.body.userAnswerRepo,
            CALLBACK_URL: callbackURL,
            BRANCH: req.body.branch,
            EVALUATE_SCRIPT_URL: config.nginxServer + req.body.evaluateScript
          })
          .end(done);
    }
  ], (err, data) => {
    if (err) {
      res.status(constant.httpCode.INTERNAL_SERVER_ERROR);
      res.send(err.stack);
    } else {
      res.send({
        uniqId: uniqId
      });
    }
  })
}

module.exports = {
  create: createTask,
  update: updateTask,
  filter: filterTask,
  findOne: findOneTask
};
