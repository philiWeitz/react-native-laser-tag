// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import { List } from 'immutable';
import { list } from 'react-immutable-proptypes';

import { List as UIList, ListItem as UIListItem } from 'react-native-elements';

import type { List as ListType } from 'immutable';
import type { BleDeviceType } from '../../model/ModelFlowTypes';


const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});


function sortByNumber(a : number, b : number) {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
}


const BleDeviceList = ({ bleDeviceList, onPress } :
  {bleDeviceList? : ListType<BleDeviceType>, onPress : (BleDeviceType) => mixed}) => {

  const onDevicePress = (device) => {
    if (onPress) {
      onPress(device);
    }
  };

  const deviceContainer = (device : BleDeviceType, idx : number) => {
    return (
      <UIListItem
        key={`ble-${idx}`}
        title={`${device.name} - ${device.id} (${device.rssi})`}
        onPress={() => { onDevicePress(device); }}
      />
    );
  };

  return (
    <UIList containerStyle={styles.container}>
      {bleDeviceList && bleDeviceList.sort(
        (a, b) => { return sortByNumber(a.rssi, b.rssi); }).map((device, idx) => {
        return deviceContainer(device, idx);
      }).toArray()}
    </UIList>
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
