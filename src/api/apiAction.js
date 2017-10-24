// @flow

import { callApi } from './api';

const ApiAction = {

  testApiCall: (successAction : Function, errorAction : Function) => {
    return callApi('/test/api/call').then(successAction, errorAction);
  },

};

export default ApiAction;
