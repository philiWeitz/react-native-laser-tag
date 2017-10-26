// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { View, AppState, ActivityIndicator } from 'react-native';

import AppContainer from './AppContainer';
import AppStateHandler from './AppStateHandler';

import { DeveloperMenu } from '../../components';
import { IntroductionNavigator, GameNavigator } from '../../router';


type ComponentPropTypes = {
  deviceId?: string,
  isLoading: boolean,
  store: Object,
  rehydrateStore: () => mixed,
};


class AppView extends React.Component<ComponentPropTypes> {

  static defaultProps = {
    deviceId: null,
  };

  constructor(props : ComponentPropTypes) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    // is called once the app is started -> reset the store
    AppStateHandler.onAppStart(this.props.store, this.props.rehydrateStore);
    // add an App change listener
    AppState.addEventListener('change', this.onAppStateChange);
  }

  componentWillUnmount() {
    // remove the App change listener
    AppState.removeEventListener('change', this.onAppStateChange);
  }

  onAppStateChange(nextAppState) {
    AppStateHandler.onAppStateChange(nextAppState, this.props.store);
  }

  renderLoadingIndicator() {
    if (this.props.isLoading) {
      return <ActivityIndicator />;
    }
    return null;
  }

  renderNavigator() {
    if (!this.props.isLoading) {
      if (this.props.deviceId) {
        return <GameNavigator />;
      }
      return <IntroductionNavigator />;
    }
    return null;
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {this.renderNavigator()}
        {this.renderLoadingIndicator()}
        <DeveloperMenu />
      </View>
    );
  }
}


AppView.propTypes = {
  deviceId: PropTypes.string,
  store: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  rehydrateStore: PropTypes.func.isRequired,
};


// export connected version
export default connect(AppContainer.mapProsToWelcomeView,
  AppContainer.mapDispatchToWelcomeView)(AppView);
