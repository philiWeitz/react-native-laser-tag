
import AsyncStoreUtil from '../../util/asyncStoreUtil';


const AppStateHandler = {

  onAppStart(store, rehydrateStore) {
    AsyncStoreUtil.rehydrateStore().then((persistedStore) => {
      const persistedStoreObj = JSON.parse(persistedStore);

      if (persistedStoreObj) {
        rehydrateStore(persistedStoreObj);
      } else {
        rehydrateStore(store);
      }
    });
  },

  onAppStateChange(nextAppState, store) {
    // states: active, inactive, background
    console.debug('App state change, next app state: ', nextAppState);

    if (nextAppState === 'background') {
      // persist state when app goes gets inactive
      AsyncStoreUtil.persistStore(JSON.stringify(store));
    }
  },

};

export default AppStateHandler;
