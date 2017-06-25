/**
 * DeviceData model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var DeviceDataEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
DeviceDataEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(DeviceData) {
  for (var e in events) {
    var event = events[e];
    DeviceData.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    DeviceDataEvents.emit(event + ':' + doc._id, doc);
    DeviceDataEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = DeviceDataEvents;
//# sourceMappingURL=deviceData.events.js.map
