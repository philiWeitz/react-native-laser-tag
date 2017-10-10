
import { BLE_DEVICE_SET_DEVICE_DATA } from '../bleDevice/BleDeviceReducer';

const PairingContainer = {

  mapProsToWelcomeView: () => {
    return {};
  },

  mapDispatchToWelcomeView: (dispatch) => {
    return {
      setBleDeviceData(data) {
        return dispatch(BLE_DEVICE_SET_DEVICE_DATA(data));
      },
    };
  },

};

export default PairingContainer;
