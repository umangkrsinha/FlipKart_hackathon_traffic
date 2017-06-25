'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _deviceData = require('./deviceData.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeviceDataSchema = new _mongoose2.default.Schema({
  device: Number,
  lat: Number,
  lon: Number
});

(0, _deviceData.registerEvents)(DeviceDataSchema);
exports.default = _mongoose2.default.model('DeviceData', DeviceDataSchema);
//# sourceMappingURL=deviceData.model.js.map
