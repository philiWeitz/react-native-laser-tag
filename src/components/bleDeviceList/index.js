
import React from 'react';
import {
  Text,
  View,
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


function sortByNumber(a, b) {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
}


const BleDeviceList = ({ bleDeviceList, onPress }) => {

  const onDevicePress = (device) => {
    if (onPress) {
      onPress(device);
    }
  };

  const deviceContainer = (device, idx) => {
    return (
      <TouchableOpacity key={`ble-${idx}`} style={styles.deviceContainer} onPress={() => { onDevicePress(device); }}>
        <Text>{device.name} - {device.id} (${device.rssi})</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {bleDeviceList.sort((a, b) => { return sortByNumber(a.rssi, b.rssi); }).map((device, idx) => {
        return deviceContainer(device, idx);
      }).toArray()}
    </View>
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
