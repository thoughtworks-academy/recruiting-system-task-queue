'use strict';

var TaskController = require('../../controllers/task-controller');
var yamlConfig = require('node-yaml-config');
var request = require('superagent');
var client = require('../../models/index');

describe('TaskController', function () {
  describe('createTask', function () {
    var taskController;

    beforeEach(function() {
      taskController = new TaskController();

      spyOn(client, 'set');
    });

    it('create ci task when receive a request', function (done) {

      spyOn(request, 'post').and.callFake(function () {
        return {
          set: function () {
            return this;
          },
          send: function () {
            return this;
          },
          query: function () {
            return this;
          },
          end: function (callback) {
            callback(null, {
              status: 200
            });
          }
        };
      });

      taskController.createTask({
        body: {
          userId:1,
          homeworkId:1,
          userAnswerRepo: 'https://github.com/thoughtworks-academy/recruiting-system-task-queue',
          evaluateScript: 'http://10.29.3.221:8888/fs/homework-script/check-readme.sh',
          callbackURL: 'http://localhost:3000/homework/result',
          branch: 'master'
        }
      },{
        sendStatus: function(status) {
          done()
        },
        send: function(data) {
          expect(data).toEqual({
            status: 200
          });
          done()
        }
      });

      expect(foo.setBar).toHaveBeenCalled()
    });

    it('return 500 when something was wrong', function (done) {

      spyOn(request, 'post').and.callFake(function () {
        return {
          set: function () {
            return this;
          },
          send: function () {
            return this;
          },
          query: function () {
            return this;
          },
          end: function (callback) {
            callback('error');
          }
        };
      });

      taskController.createTask({
        body: {
          userId: 1,
          homeworkId: 1,
          userAnswerRepo: 'https://github.com/thoughtworks-academy/recruiting-system-task-queue',
          evaluateScript: 'http://10.29.3.221:8888/fs/homework-script/check-readme.sh',
          callbackURL: 'http://localhost:3000/homework/result',
          branch: 'master'
        }
      },{
        sendStatus: function(status) {
          expect(status).toEqual(500);
          done()
        },
        send: function(data) {
          done()
        }
      });

      expect(foo.setBar).toHaveBeenCalled()
    });

  });

  describe('result', function () {
    var taskController;

    beforeEach(function() {
      taskController = new TaskController();

      spyOn(client, 'get').and.callFake(function (homeworkName, callback) {
        callback(null, JSON.stringify({
          userId: 1,
          homeworkId: 1,
          userAnswerRepo: 'https://github.com/thoughtworks-academy/recruiting-system-task-queue',
          evaluateScript: 'http://10.29.3.221:8888/fs/homework-script/check-readme.sh',
          callbackURL: 'http://localhost:3000/homework/result',
          branch: 'master'
        }));

      });

      spyOn(client, 'del').and.callFake(function (homeworkName, callback) {
        callback(null, null);
      });
    });

    it('delete the redis record and send request to app', function (done) {

      spyOn(request, 'post').and.callFake(function () {
        return {
          set: function () {
            return this;
          },
          send: function () {
            return this;
          },
          query: function () {
            return this;
          },
          end: function (callback) {
            callback(null, {
              status: 200
            });
          }
        };
      });

      taskController.result({
        params: {
          homeworkName: 'homework_1_1'
        },
        body: {
          result: 1,
          job_name: 'TASK-QUEUE',
          build_number: 15
        }
      },{
        sendStatus: function(status) {
          done()
        },
        send: function(data) {
          expect(data).toEqual({
            status: 200
          });
          done()
        }
      });
    });

    it('return 500 when something was wrong', function (done) {

      spyOn(request, 'post').and.callFake(function () {
        return {
          set: function () {
            return this;
          },
          send: function () {
            return this;
          },
          query: function () {
            return this;
          },
          end: function (callback) {
            callback('error');
          }
        };
      });

      taskController.createTask({
        params: {
          homeworkName: 'homework_1_1'
        },
        body: {
          result: 1,
          job_name: 'TASK-QUEUE',
          build_number: 15
        }
      },{
        sendStatus: function(status) {
          expect(status).toEqual(500);
          done()
        },
        send: function(data) {
          done()
        }
      });

      expect(foo.setBar).toHaveBeenCalled()
    });

  })
});