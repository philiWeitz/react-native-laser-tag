// @flow

import {
  NativeModules,
  NativeEventEmitter,
  Platform,
  Linking,
  PermissionsAndroid,
} from 'react-native';

import BleManager from 'react-native-ble-manager';
import type { BleDeviceType, BleCharDataType } from '../model/ModelFlowTypes';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);


// function = (device) => {}
let onDeviceFoundCallback = null;
// function = () => {}
let onScanningStopCallback = null;
// bluetooth state
let bluetoothEnabled = false;
// function = (data) => {}
let dataCallback = null;


function handleDisconnectedPeripheral(data : BleCharDataType) {
  console.debug(`Disconnected from ${data.peripheral}`);
}

function handleUpdateValueForCharacteristic(data : BleCharDataType) {
  console.debug(`Received data from ${data.peripheral} characteristic ${data.characteristic}, ${data.value}`);
  if (dataCallback) {
    dataCallback(data);
  }
}

function handleStopScan() {
  console.debug('Stopped scanning');
  if (onScanningStopCallback) {
    onScanningStopCallback();
  }
}

function handleDiscoverPeripheral(peripheral : BleDeviceType) {
  if (onDeviceFoundCallback) {
    onDeviceFoundCallback(peripheral);
  }
}

function handlerBluetoothOnOffState(args : {state : boolean}) {
  bluetoothEnabled = args.state === 'on';
  console.debug('Bluetooth state: ', args.state);
}

const BleUtil = {

  initBleUtil() : Promise<null> {
    return new Promise((resolve) => {
      BleManager.start({ showAlert: false })
        .then(() => {
          console.debug('BLE Module initialized');

          // ensure that the state was checked
          const tmp = BleManagerEmitter.addListener(
            'BleManagerDidUpdateState', (args) => {
              tmp.remove();
              handlerBluetoothOnOffState(args);
              resolve();
            }, null);
        });

      this.handlerDiscover = BleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral', handleDiscoverPeripheral, null);
      this.handlerStop = BleManagerEmitter.addListener(
        'BleManagerStopScan', handleStopScan, null);
      this.handlerDisconnect = BleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral', handleDisconnectedPeripheral, null);
      this.handlerUpdate = BleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic, null);
      this.handlerBluetoothState = BleManagerEmitter.addListener(
        'BleManagerDidUpdateState', handlerBluetoothOnOffState, null);

      if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
          if (result) {
            console.debug('Android permission is OK');
          } else {
            PermissionsAndroid.requestPermission(
              PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((permissionResult) => {
              if (permissionResult) {
                console.debug('User accept');
              } else {
                console.debug('User refuse');
              }
            });
          }
        });
      }
      // get bluetooth state (on or off)
      BleManager.checkState();
    });
  },

  setDataCallback(callback : ?(BleCharDataType) => mixed) {
    dataCallback = callback;
  },

  isBluetoothEnabled() {
    return bluetoothEnabled;
  },

  startScanning(onDeviceFound : (BleDeviceType) => mixed, onScanningStop : () => mixed) {

    BleManager.scan([], 5, true)
      .then(() => {
        // Success code
        console.debug('Scan started');
        onDeviceFoundCallback = onDeviceFound;
        onScanningStopCallback = onScanningStop;
      });
  },

  stopScanning() : Promise<null> {
    if (bluetoothEnabled) {
      return BleManager.stopScan();
    }
    return Promise.resolve();
  },

  getServices(device : BleDeviceType) : Promise<any> {
    if (bluetoothEnabled) {
      return BleManager.retrieveServices(device.id);
    }
    return Promise.resolve(null);
  },

  connect(device : BleDeviceType) : Promise<null> {
    if (bluetoothEnabled) {
      return BleManager.connect(device.id);
    }
    return Promise.reject();
  },

  async startNotify(id : string, serviceId : string, characteristicId : string) {
    const result = await BleManager.startNotification(id, serviceId, characteristicId).catch(() => {
      return false;
    });
    return result === undefined;
  },

  async read(id : string, serviceId : string, characteristicId : string) {
    const result = await BleManager.read(id, serviceId, characteristicId).catch(() => {
      return null;
    });
    return result;
  },

  async openBluetoothSettings() : Promise<boolean> {
    if (Platform.OS === 'android') {
      const result = await BleManager.enableBluetooth().catch(() => {
        return false;
      });
      return result === undefined;
    }
    return Linking.openURL('app-settings:{3}');
  },

  destroyBleUtil() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
    this.handlerBluetoothState.remove();
  },

};

export default BleUtil;
