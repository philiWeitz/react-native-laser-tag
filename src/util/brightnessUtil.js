// @flow

import DeviceBrightness from 'react-native-device-brightness';

const BrightnessUtil = {

  async getBrightness() : Promise<number> {
    return DeviceBrightness.getBrightnessLevel();
  },

  setBrightness(value : number) {
    DeviceBrightness.setBrightnessLevel(value);
  },
};

export default BrightnessUtil;
