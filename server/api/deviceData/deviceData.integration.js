'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newDeviceData;

describe('DeviceData API:', function() {
  describe('GET /api/deviceData', function() {
    var deviceDatas;

    beforeEach(function(done) {
      request(app)
        .get('/api/deviceData')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          deviceDatas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(deviceDatas).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/deviceData', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/deviceData')
        .send({
          name: 'New DeviceData',
          info: 'This is the brand new deviceData!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newDeviceData = res.body;
          done();
        });
    });

    it('should respond with the newly created deviceData', function() {
      expect(newDeviceData.name).to.equal('New DeviceData');
      expect(newDeviceData.info).to.equal('This is the brand new deviceData!!!');
    });
  });

  describe('GET /api/deviceData/:id', function() {
    var deviceData;

    beforeEach(function(done) {
      request(app)
        .get(`/api/deviceData/${newDeviceData._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          deviceData = res.body;
          done();
        });
    });

    afterEach(function() {
      deviceData = {};
    });

    it('should respond with the requested deviceData', function() {
      expect(deviceData.name).to.equal('New DeviceData');
      expect(deviceData.info).to.equal('This is the brand new deviceData!!!');
    });
  });

  describe('PUT /api/deviceData/:id', function() {
    var updatedDeviceData;

    beforeEach(function(done) {
      request(app)
        .put(`/api/deviceData/${newDeviceData._id}`)
        .send({
          name: 'Updated DeviceData',
          info: 'This is the updated deviceData!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedDeviceData = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDeviceData = {};
    });

    it('should respond with the updated deviceData', function() {
      expect(updatedDeviceData.name).to.equal('Updated DeviceData');
      expect(updatedDeviceData.info).to.equal('This is the updated deviceData!!!');
    });

    it('should respond with the updated deviceData on a subsequent GET', function(done) {
      request(app)
        .get(`/api/deviceData/${newDeviceData._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let deviceData = res.body;

          expect(deviceData.name).to.equal('Updated DeviceData');
          expect(deviceData.info).to.equal('This is the updated deviceData!!!');

          done();
        });
    });
  });

  describe('PATCH /api/deviceData/:id', function() {
    var patchedDeviceData;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/deviceData/${newDeviceData._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched DeviceData' },
          { op: 'replace', path: '/info', value: 'This is the patched deviceData!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedDeviceData = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedDeviceData = {};
    });

    it('should respond with the patched deviceData', function() {
      expect(patchedDeviceData.name).to.equal('Patched DeviceData');
      expect(patchedDeviceData.info).to.equal('This is the patched deviceData!!!');
    });
  });

  describe('DELETE /api/deviceData/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/deviceData/${newDeviceData._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when deviceData does not exist', function(done) {
      request(app)
        .delete(`/api/deviceData/${newDeviceData._id}`)
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
