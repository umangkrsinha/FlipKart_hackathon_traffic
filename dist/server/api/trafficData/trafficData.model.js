'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _trafficData = require('./trafficData.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TrafficDataSchema = new _mongoose2.default.Schema({
  device: Number,
  timestamp: Number,
  macadd: String
});

(0, _trafficData.registerEvents)(TrafficDataSchema);
exports.default = _mongoose2.default.model('TrafficData', TrafficDataSchema);
//# sourceMappingURL=trafficData.model.js.map
