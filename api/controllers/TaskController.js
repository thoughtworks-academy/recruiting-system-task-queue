'use strict';

var sails = require('sails');
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
    }
  ], function (err, data){
    console.log();
    res.send(data);
  });
}

function filterTask(req, res) {
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
  var createJobStr = config.CIServer + '/job/' + config.jobName + '/buildWithParameters';

  var created;

  async.waterfall([
    (done) => {
      Task.create(req.body).exec(done)
    },
    (data, done) => {
      created = data;
      var callbackURL = config.taskServer + '/tasks/' + data.id;
      done(null, {
        USER_REPO: req.body.userAnswerRepo,
        CALLBACK_URL: callbackURL,
        BRANCH: req.body.branch,
        EVALUATE_SCRIPT_URL: config.nginxServer + req.body.evaluateScript
      })
    },
    (data, done) => {
      request
          .post(createJobStr)
          .set('Content-Type', 'application/json')
          .query(data)
          .end(done);
    }
  ], (err, data) => {
    if (err) {return next(req, res, err)}
    res.send(created);
  })
}

module.exports = {
  create: createTask,
  update: updateTask,
  filter: filterTask,
  findOne: findOneTask
};
