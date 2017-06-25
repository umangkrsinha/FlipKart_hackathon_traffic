'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var deviceDataCtrlStub = {
  index: 'deviceDataCtrl.index',
  show: 'deviceDataCtrl.show',
  create: 'deviceDataCtrl.create',
  upsert: 'deviceDataCtrl.upsert',
  patch: 'deviceDataCtrl.patch',
  destroy: 'deviceDataCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var deviceDataIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './deviceData.controller': deviceDataCtrlStub
});

describe('DeviceData API Router:', function() {
  it('should return an express router instance', function() {
    expect(deviceDataIndex).to.equal(routerStub);
  });

  describe('GET /api/deviceData', function() {
    it('should route to deviceData.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'deviceDataCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/deviceData/:id', function() {
    it('should route to deviceData.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'deviceDataCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/deviceData', function() {
    it('should route to deviceData.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'deviceDataCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/deviceData/:id', function() {
    it('should route to deviceData.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'deviceDataCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/deviceData/:id', function() {
    it('should route to deviceData.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'deviceDataCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/deviceData/:id', function() {
    it('should route to deviceData.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'deviceDataCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
