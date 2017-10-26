
import { APP_REHYDRATE_STORE_START } from './AppReducer';

const AppContainer = {

  mapProsToWelcomeView: (state) => {
    return {
      store: state,
      deviceId: state.bleDevice.id,
      isLoading: state.app.isLoading,
    };
  },

  mapDispatchToWelcomeView: (dispatch) => {
    return {
      rehydrateStore(store) {
        return dispatch(APP_REHYDRATE_STORE_START(store));
      },
    };
  },

};

export default AppContainer;
