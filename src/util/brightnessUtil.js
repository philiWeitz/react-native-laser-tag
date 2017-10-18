
import DeviceBrightness from 'react-native-device-brightness';

const BrightnessUtil = {

  async getBrightness() {
    return DeviceBrightness.getBrightnessLevel();
  },

  setBrightness(value) {
    DeviceBrightness.setBrightnessLevel(value);
  },
};

export default BrightnessUtil;
