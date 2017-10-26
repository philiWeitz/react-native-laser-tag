
import Immutable from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import { APP_REHYDRATE_STORE_START } from '../app/AppReducer';

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

  [APP_REHYDRATE_STORE_START]: (state, action) => {
    if (action.payload.bleDevice) {
      return state.merge(action.payload.bleDevice);
    }
    return state;
  },

}, initialState);

export default BleDeviceReducer;
