
import Immutable from 'immutable';
import { handleActions, createAction } from 'redux-actions';

export const BLE_DEVICE_SET_DEVICE_DATA = createAction('BLE_DEVICE_SET_DEVICE_DATA');

// Initial state
const BleDeviceStateRecord = Immutable.Record({
  id: null,
  name: null,
  characteristic: null,
});

const initialState = new BleDeviceStateRecord();


const BleDeviceReducer = handleActions({

  [BLE_DEVICE_SET_DEVICE_DATA]: (state, action) => state.merge({
    id: action.payload.id,
    name: action.payload.name,
    characteristic: action.payload.characteristic,
  }),

}, initialState);

export default BleDeviceReducer;
