
const AppContainer = {

  mapProsToWelcomeView: (state) => {
    return {
      deviceId: state.bleDevice.id,
    };
  },

  mapDispatchToWelcomeView: () => {
    return {};
  },

};

export default AppContainer;
