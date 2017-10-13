
import React from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import { List } from 'immutable';
import { list } from 'react-immutable-proptypes';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  deviceContainer: {
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

const BleDeviceList = ({ bleDeviceList, onPress }) => {

  const onDevicePress = (device) => {
    if (onPress) {
      onPress(device);
    }
  };

  const deviceContainer = (device, idx) => {
    return (
      <TouchableOpacity key={`ble-${idx}`} style={styles.deviceContainer} onPress={() => { onDevicePress(device); }}>
        <Text>{device.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {bleDeviceList.sortBy((device) => device.rssi).map((device, idx) => {
        return deviceContainer(device, idx);
      }).toArray()}
    </ScrollView>
  );

};

BleDeviceList.propTypes = {
  bleDeviceList: list,
  onPress: PropTypes.func.isRequired,
};

BleDeviceList.defaultProps = {
  bleDeviceList: List(),
};

export default BleDeviceList;
