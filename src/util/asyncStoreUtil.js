
import { AsyncStorage } from 'react-native';


const STORE_STATE_KEY = 'laserTagAppStoreStateKey';


const AsyncStoreUtil = {

  async persistStore(value) {
    try {
      await AsyncStorage.setItem(STORE_STATE_KEY, value);
    } catch (error) {
      console.error('Error persisting store!', error);
    }
  },

  async rehydrateStore() {
    try {
      const value = await AsyncStorage.getItem(STORE_STATE_KEY);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.error('Error rehydrate store!', error);
    }
    return null;
  },

  async clearStore() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.debug('Error clearing store!', error);
    }
  },
};

export default AsyncStoreUtil;
