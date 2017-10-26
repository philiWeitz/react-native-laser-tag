
import { combineReducers } from 'redux-loop';

import BleDeviceReducer from '../modules/bleDevice/BleDeviceReducer';
import WelcomeReducer from '../modules/welcome/WelcomeReducer';
import AppStateReducer from '../modules/app/AppReducer';


const combinedReducers = combineReducers({
  bleDevice: BleDeviceReducer,
  welcome: WelcomeReducer,
  app: AppStateReducer,
});

export default combinedReducers;
