// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import Button from '../../components/button';
import WelcomeContainer from './WelcomeContainer';

import t from '../../util/locale';


const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});


const WelcomeView = ({ navigation } : { navigation : Object }) => {

  const onPairingWithDevicePress = () => {
    if (navigation) {
      const navigateAction = NavigationActions.navigate({
        routeName: 'Pairing',
      });
      navigation.dispatch(navigateAction);
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Button
          text={t('welcome.search_for_devices')}
          onPress={onPairingWithDevicePress}
        />
      </View>
    </View>
  );
};


WelcomeView.propTypes = {
  navigation: PropTypes.object.isRequired,
};


// export connected version
export default connect(WelcomeContainer.mapProsToWelcomeView,
  WelcomeContainer.mapDispatchToWelcomeView)(WelcomeView);
