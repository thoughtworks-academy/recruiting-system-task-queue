//'use strict';
//
//var supertest = require('supertest');
//var redis = require('redis');
//var app = require('../app');
//var request = require('superagent');
//
//describe('POST /task', function () {
//  var client;
//  beforeEach(function() {
//    client = jasmine.createSpyObj('client', ['set', 'get', 'del']);
//
//    spyOn(redis, 'createClient').and.returnValue(client);
//  });
//
//  xit('is validate api', function (done) {
//    supertest(app)
//        .post('/tasks')
//        .set('Content-Type', 'application/json')
//        .expect(200)
//        .end(function(err, res) {
//          if (err) {
//            done.fail(err);
//          } else {
//            done();
//          }
//        })
//  });
//
//  xit('can save data', function (done) {
//    supertest(app)
//        .post('/tasks')
//        .set('Content-Type', 'application/json')
//        .send({
//          userId: 1,
//          quizId: 1,
//          callbackURL: 'http://localhost:3000/result'
//        })
//        .end(function(err, res) {
//          console.log(client.set.calls.first())
//          expect(client.set.calls.first()).toEqual();
//
//          expect(res.body).toEqual({
//            status: 200
//          });
//          done();
//        })
//  })
//});
//
//describe('POST /tasks/:homeworkName/completion', function () {
//  beforeEach(() => {
//    spyOn(redis, 'createClient').and.callFake(function () {
//      return {
//        set: function(homeworkName) {},
//        get: function(homeworkName, callback) {
//          callback(null, JSON.stringify({
//            callbackURL: 'http://10.29.3.219:4000/task-result'
//          }))
//        },
//        del: function(homeworkName, callback) {
//          calback(null, null);
//        }
//      }
//    });
//
//    spyOn(request, 'post').and.callFake(function () {
//      return {
//        set: function () {
//          return this;
//        },
//        send: function () {
//          return this;
//        },
//        end: function (callback) {
//          callback(null, null)
//        }
//      };
//    });
//  });
//
//  xit('is validate api', function (done) {
//    supertest(app)
//      .post('/tasks/homework_1_1/completion')
//      .set('Content-Type', 'application/json')
//      .expect(200)
//      .end(function(err, res) {
//        if (err) {
//          done.fail(err);
//        } else {
//          done();
//        }
//      })
//  });
//
//  xit('can delete data', function (done) {
//    supertest(app)
//      .post('/tasks/homework_1_1/completion')
//      .set('Content-Type', 'application/json')
//      .send({
//        result: 1,
//        job_name: "TASK-QUEUE",
//        build_number: 16
//      })
//      .end(function(err, res) {
//        expect(res.body).toEqual({
//          status: 200
//        });
//        done();
//      });
//  })
//});