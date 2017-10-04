
import { GUN_SET_GUN_DEVICE } from '../gun/GunReducer';

const WelcomeContainer = {

  mapProsToWelcomeView: (state) => {
    return {};
  },

  mapDispatchToWelcomeView: (dispatch) => {
    return {
      setGun: (gun) => {
        return dispatch(GUN_SET_GUN_DEVICE(gun));
      }
    };
  },

};

export default WelcomeContainer;
