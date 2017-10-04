
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

// TODO: remove - only for debug
import {List} from 'immutable';

import WelcomeContainer from './WelcomeContainer';
import AudioUtil from '../../util/audioUtil';

import BlDeviceList from '../../components/bleDeviceList';

// TODO: remove - only for debug
const deviceList = List([
  {name: 'Test Device 1'},
  {name: 'Test Device 2'},
  {name: 'Test Device 3'}
]);

const WelcomeView = ({ setGun, navigation }) => {

  const onBleDevicePress = (bleDevice) => {
    if (setGun && navigation) {
      setGun(bleDevice).then(() =>
      {
        const navigateAction = NavigationActions.navigate({
          routeName: 'Pairing'
        });
        navigation.dispatch(navigateAction);
      });
    }
  };

  return (
    <View>
      <Text>BLE Devices:</Text>
      <BlDeviceList bleDeviceList={deviceList} onPress={onBleDevicePress} />
    </View>
  );
};


WelcomeView.propTypes = {
  setGun: PropTypes.func.isRequired,
};


// export connected version
export default connect(WelcomeContainer.mapProsToWelcomeView,
  WelcomeContainer.mapDispatchToWelcomeView)(WelcomeView);
