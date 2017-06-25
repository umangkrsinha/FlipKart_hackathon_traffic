'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './trafficData.events';

var TrafficDataSchema = new mongoose.Schema({
  device: Number,
  timestamp: Number,
  macadd: String
});

registerEvents(TrafficDataSchema);
export default mongoose.model('TrafficData', TrafficDataSchema);
