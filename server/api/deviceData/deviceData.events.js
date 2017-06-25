/**
 * DeviceData model events
 */

'use strict';

import {EventEmitter} from 'events';
var DeviceDataEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DeviceDataEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(DeviceData) {
  for(var e in events) {
    let event = events[e];
    DeviceData.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    DeviceDataEvents.emit(event + ':' + doc._id, doc);
    DeviceDataEvents.emit(event, doc);
  };
}

export {registerEvents};
export default DeviceDataEvents;
