
import { combineReducers } from 'redux-loop';

import BleDeviceReducer from '../modules/bleDevice/BleDeviceReducer';
import WelcomeReducer from '../modules/welcome/WelcomeReducer';


const combinedReducers = combineReducers({
  bleDevice: BleDeviceReducer,
  welcome: WelcomeReducer,
});

export default combinedReducers;
