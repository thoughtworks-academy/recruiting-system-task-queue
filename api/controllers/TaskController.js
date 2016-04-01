'use strict';

var request = require('superagent');
var async = require('async');
var yamlConfig = require('node-yaml-config');
var config = yamlConfig.load('./api/config/config.yml');
var constant = require('../mixin/constant');

module.exports = {
  createTask: function(req, res) {
		var uniqId;
    async.waterfall([
			(done) => {
				Task.create({
		      homeworkURL: req.body.userAnswerRepo,
		      status: constant.homeworkQuizzesStatus.LINE_UP,
		      version: req.body.version,
		      branch: req.branch,
		      commitTime: Date.parse(new Date()) / constant.time.MILLISECOND_PER_SECONDS
		    }).exec(done)
			},
      (result, done) => {
				uniqId = result.id;
				var createJobStr = config.CIServer + '/job/' + config.jobName + '/buildWithParameters';
				var callbackURL = config.taskServer + ':' + config.port + '/tasks/' + uniqId + '/completion';

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
    ], (err, res) => {
			if (err) {
				res.sendStatus(constant.httpCode.INTERNAL_SERVER_ERROR);
			} else {
				res.send({
					status: constant.httpCode.OK,
					uniqId: uniqId
				});
			}
    })
  },
  result: function(req, res) {
  	
  }
};
