
import React from 'react';
import {
  NativeModules,
  NativeEventEmitter
} from 'react-native';

import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// function = (device) => {}
let onDeviceFoundCallback = null;

function handleDisconnectedPeripheral(data) {
  console.log('Disconnected from ' + data.peripheral);
}

function handleUpdateValueForCharacteristic(data) {
  console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
}

function handleStopScan() {
  console.log('Scan is stopped');
}

function handleDiscoverPeripheral(peripheral){
  console.log('Got ble peripheral', peripheral);
  if (onDeviceFoundCallback) {
    onDeviceFoundCallback(peripheral);
  }
}

const BleUtil = {

  initBleUtil() {
    BleManager.start({showAlert: false})
      .then(() => {
        // Success code
        console.log('Module initialized');
      });

    this.handlerDiscover = BleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral', handleDiscoverPeripheral, null);
    this.handlerStop = BleManagerEmitter.addListener(
      'BleManagerStopScan', handleStopScan, null);
    this.handlerDisconnect = BleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral', handleDisconnectedPeripheral, null);
    this.handlerUpdate = BleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic, null);
  },

  startScanning(onDeviceFound) {
    BleManager.scan([], 5, true)
      .then(() => {
        // Success code
        console.log('Scan started');
        onDeviceFoundCallback = onDeviceFound;
      });
  },

  stopScanning() {
    BleManager.stopScan()
      .then(() => {
        // Success code
        console.log('Scan stopped');
      });
  },

  destroyBleUtil() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }

};

export default BleUtil;
