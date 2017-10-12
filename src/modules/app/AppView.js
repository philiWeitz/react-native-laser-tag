
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppContainer from './AppContainer';
import { IntroductionNavigator, GameNavigator } from '../../router';


const AppView = ({ deviceId }) => {

  const renderContent = () => {
    if (deviceId) {
      return <GameNavigator />;
    }
    return <IntroductionNavigator />;
  };

  return renderContent();

};


AppView.propTypes = {
  deviceId: PropTypes.string,
};


AppView.defaultProps = {
  deviceId: null,
};


// export connected version
export default connect(AppContainer.mapProsToWelcomeView,
  AppContainer.mapDispatchToWelcomeView)(AppView);
