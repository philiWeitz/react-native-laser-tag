
import 'babel-polyfill';

import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import {IntroductionNavigator} from '../router/router';


const ReduxApp = () => (
  <Provider store={store}>
    <IntroductionNavigator />
  </Provider>
);

export default ReduxApp;
