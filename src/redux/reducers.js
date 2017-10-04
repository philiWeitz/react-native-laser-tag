
import { combineReducers } from 'redux-loop';

import GunReducer from '../modules/gun/GunReducer';
import WelcomeReducer from '../modules/welcome/WelcomeReducer';


const combinedReducers = combineReducers({
  gun: GunReducer,
  welcome: WelcomeReducer,
});

export default combinedReducers;
