'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './deviceData.events';

var DeviceDataSchema = new mongoose.Schema({
  device: Number,
  lat: Number,
  lon: Number
});

registerEvents(DeviceDataSchema);
export default mongoose.model('DeviceData', DeviceDataSchema);
