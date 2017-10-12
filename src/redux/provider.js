
import 'babel-polyfill';

import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import AppView from '../modules/app/AppView';

const ReduxApp = () => (
  <Provider store={store}>
    <AppView />
  </Provider>
);

export default ReduxApp;
