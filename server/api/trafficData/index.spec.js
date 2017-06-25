'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var trafficDataCtrlStub = {
  index: 'trafficDataCtrl.index',
  show: 'trafficDataCtrl.show',
  create: 'trafficDataCtrl.create',
  upsert: 'trafficDataCtrl.upsert',
  patch: 'trafficDataCtrl.patch',
  destroy: 'trafficDataCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var trafficDataIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './trafficData.controller': trafficDataCtrlStub
});

describe('TrafficData API Router:', function() {
  it('should return an express router instance', function() {
    expect(trafficDataIndex).to.equal(routerStub);
  });

  describe('GET /api/trafficData', function() {
    it('should route to trafficData.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'trafficDataCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/trafficData/:id', function() {
    it('should route to trafficData.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'trafficDataCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/trafficData', function() {
    it('should route to trafficData.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'trafficDataCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/trafficData/:id', function() {
    it('should route to trafficData.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'trafficDataCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/trafficData/:id', function() {
    it('should route to trafficData.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'trafficDataCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/trafficData/:id', function() {
    it('should route to trafficData.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'trafficDataCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
