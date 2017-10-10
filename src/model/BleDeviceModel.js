
import { Record } from 'immutable';

const BleDeviceModel = Record({
  name: '',
});

BleDeviceModel.build = (data) => new BleDeviceModel(data);

export default BleDeviceModel;
