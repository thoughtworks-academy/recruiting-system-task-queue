'use strict';

var supertest = require('supertest');
var redis = require('redis');
var app = require('../app');

describe('POST /task', function () {
  it('is validate api', function (done) {
    supertest(app)
        .post('/tasks')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            done.fail(err);
          } else {
            done();
          }
        })
  });

  it('can save data', function (done) {
    var client = jasmine.createSpyObj('client', ['set']);

    spyOn(redis, 'createClient').and.returnValue(client);

    supertest(app)
        .post('/tasks')
        .set('Content-Type', 'application/json')
        .send({
          userId: 1,
          quizId: 1
        })
        .end(function(err, res) {
          expect(client.set.calls.first().args[0]).toEqual('homework_1_1');
          expect(client.set.calls.first().args[1]).toEqual(JSON.stringify({
            userId: 1,
            quizId: 1
          }));
          done();
        })
  })
});