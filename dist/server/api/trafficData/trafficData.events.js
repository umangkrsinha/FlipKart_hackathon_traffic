/**
 * TrafficData model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var TrafficDataEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
TrafficDataEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(TrafficData) {
  for (var e in events) {
    var event = events[e];
    TrafficData.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    TrafficDataEvents.emit(event + ':' + doc._id, doc);
    TrafficDataEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = TrafficDataEvents;
//# sourceMappingURL=trafficData.events.js.map
