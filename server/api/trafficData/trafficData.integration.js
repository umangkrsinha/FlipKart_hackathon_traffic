'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newTrafficData;

describe('TrafficData API:', function() {
  describe('GET /api/trafficData', function() {
    var trafficDatas;

    beforeEach(function(done) {
      request(app)
        .get('/api/trafficData')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          trafficDatas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(trafficDatas).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/trafficData', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/trafficData')
        .send({
          name: 'New TrafficData',
          info: 'This is the brand new trafficData!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTrafficData = res.body;
          done();
        });
    });

    it('should respond with the newly created trafficData', function() {
      expect(newTrafficData.name).to.equal('New TrafficData');
      expect(newTrafficData.info).to.equal('This is the brand new trafficData!!!');
    });
  });

  describe('GET /api/trafficData/:id', function() {
    var trafficData;

    beforeEach(function(done) {
      request(app)
        .get(`/api/trafficData/${newTrafficData._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          trafficData = res.body;
          done();
        });
    });

    afterEach(function() {
      trafficData = {};
    });

    it('should respond with the requested trafficData', function() {
      expect(trafficData.name).to.equal('New TrafficData');
      expect(trafficData.info).to.equal('This is the brand new trafficData!!!');
    });
  });

  describe('PUT /api/trafficData/:id', function() {
    var updatedTrafficData;

    beforeEach(function(done) {
      request(app)
        .put(`/api/trafficData/${newTrafficData._id}`)
        .send({
          name: 'Updated TrafficData',
          info: 'This is the updated trafficData!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTrafficData = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTrafficData = {};
    });

    it('should respond with the updated trafficData', function() {
      expect(updatedTrafficData.name).to.equal('Updated TrafficData');
      expect(updatedTrafficData.info).to.equal('This is the updated trafficData!!!');
    });

    it('should respond with the updated trafficData on a subsequent GET', function(done) {
      request(app)
        .get(`/api/trafficData/${newTrafficData._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let trafficData = res.body;

          expect(trafficData.name).to.equal('Updated TrafficData');
          expect(trafficData.info).to.equal('This is the updated trafficData!!!');

          done();
        });
    });
  });

  describe('PATCH /api/trafficData/:id', function() {
    var patchedTrafficData;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/trafficData/${newTrafficData._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched TrafficData' },
          { op: 'replace', path: '/info', value: 'This is the patched trafficData!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTrafficData = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTrafficData = {};
    });

    it('should respond with the patched trafficData', function() {
      expect(patchedTrafficData.name).to.equal('Patched TrafficData');
      expect(patchedTrafficData.info).to.equal('This is the patched trafficData!!!');
    });
  });

  describe('DELETE /api/trafficData/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/trafficData/${newTrafficData._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when trafficData does not exist', function(done) {
      request(app)
        .delete(`/api/trafficData/${newTrafficData._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
