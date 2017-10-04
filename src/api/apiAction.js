
import { callApi } from './api';

const ApiAction = {

  testApiCall: (successAction, errorAction) => {
    return callApi('/test/api/call').then(successAction, errorAction);
  },

};

export default ApiAction;
