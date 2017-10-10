
import {
  NativeModules,
  NativeEventEmitter,
} from 'react-native';

import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// function = (device) => {}
let onDeviceFoundCallback = null;
// function = () => {}
let onScanningStopCallback = null;

function handleDisconnectedPeripheral(data) {
  console.debug(`Disconnected from ${data.peripheral}`);
}

function handleUpdateValueForCharacteristic(data) {
  console.debug(`Received data from ${data.peripheral} characteristic ${data.characteristic}, ${data.value}`);
}

function handleStopScan() {
  console.debug('Stopped scanning');
  if (onScanningStopCallback) {
    onScanningStopCallback();
  }
}

function handleDiscoverPeripheral(peripheral) {
  if (onDeviceFoundCallback) {
    onDeviceFoundCallback(peripheral);
  }
}

const BleUtil = {

  initBleUtil() {
    return new Promise((resolve) => {
      BleManager.start({ showAlert: false })
        .then(() => {
          console.debug('BLE Module initialized');
          return resolve();
        });

      this.handlerDiscover = BleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral', handleDiscoverPeripheral, null);
      this.handlerStop = BleManagerEmitter.addListener(
        'BleManagerStopScan', handleStopScan, null);
      this.handlerDisconnect = BleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral', handleDisconnectedPeripheral, null);
      this.handlerUpdate = BleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic, null);
    });
  },

  startScanning(onDeviceFound, onScanningStop) {
    BleManager.scan([], 5, true)
      .then(() => {
        // Success code
        console.debug('Scan started');
        onDeviceFoundCallback = onDeviceFound;
        onScanningStopCallback = onScanningStop;
      });
  },

  stopScanning() {
    return BleManager.stopScan();
  },

  getServices(device) {
    return BleManager.retrieveServices(device.id);
  },

  connect(device) {
    return BleManager.connect(device.id);
  },

  destroyBleUtil() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  },

};

export default BleUtil;
