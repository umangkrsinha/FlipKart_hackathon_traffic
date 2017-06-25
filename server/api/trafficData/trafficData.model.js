'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './trafficData.events';

var TrafficDataSchema = new mongoose.Schema({
  device: Number,
  timestamp: Number,
  macadd: String
});

var DeviceDataSchema = new mongoose.Schema({
  device: Number
  lat: Number,
  lon: Number
});

registerEvents(TrafficDataSchema);
export default mongoose.model('TrafficData', TrafficDataSchema);
export default mongoose.model('DeviceData', DeviceDataSchema);
