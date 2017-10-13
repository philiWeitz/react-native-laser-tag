
import _ from 'lodash';
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Text, View, ActivityIndicator } from 'react-native';

import t from '../../util/locale';
import BleUtil from '../../util/bleUtil';
import PairingContainer from './PairingContainer';

import Button from '../../components/button';
import BleDeviceList from '../../components/bleDeviceList';
import ModalInfoDialog from '../../components/modalInfoDialog';

const HM_10_SERVICE = '0000ffe0-0000-1000-8000-00805f9b34fb';
const HM_10_CHARACTERISTIC = '0000ffe1-0000-1000-8000-00805f9b34fb';


function getHM10Characteristic(services) {
  if (!services) {
    console.warn('Error: services is not defined');
    return null;
  }

  // get the correct characteristics for the HM-10 module
  return _.find(services.characteristics, (item) => {
    if (item.service && item.characteristic) {
      return item.service.toLowerCase() === HM_10_SERVICE &&
        item.characteristic.toLowerCase() === HM_10_CHARACTERISTIC;
    }
    return false;
  });
}


class PairingView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bleDeviceList: List([]),
      isScanning: false,
      isConnecting: false,
      hasConnectionError: false,
      showBluetoothDisabledDialog: false,
    };

    this.renderContent = this.renderContent.bind(this);
    this.onScanAgainPress = this.onScanAgainPress.bind(this);
    this.onBleDevicePress = this.onBleDevicePress.bind(this);
    this.onBleDeviceFound = this.onBleDeviceFound.bind(this);
    this.onBleScanningStop = this.onBleScanningStop.bind(this);
    this.renderConnectionErrorModalDialog = this.renderConnectionErrorModalDialog.bind(this);
    this.renderBluetoothDisabledModalDialog = this.renderBluetoothDisabledModalDialog.bind(this);
  }

  componentWillMount() {
    BleUtil.initBleUtil().then(() => {
      this.onScanAgainPress();
    });
  }

  componentWillUnmount() {
    BleUtil.destroyBleUtil();
  }

  onBleScanningStop() {
    this.setState({ isScanning: false });
  }

  onBleDeviceFound(device) {
    const alreadyIncluded = this.state.bleDeviceList.find((item) => {
      return item.id === device.id;
    });

    if (device.name && !alreadyIncluded) {
      console.debug('Got valid ble device', device.name);
      this.setState({ bleDeviceList: this.state.bleDeviceList.push(device) });
    }
  }

  onBleDevicePress(device) {
    BleUtil.stopScanning();
    this.setState({ isScanning: false, isConnecting: true });
    console.debug('Connecting...');

    BleUtil.connect(device).then(async () => {
      const services = await BleUtil.getServices(device);
      console.debug('Device service info:', services);

      // get the HM-10 characteristic
      const characteristic = getHM10Characteristic(services);
      if (!characteristic) {
        this.setState({ isConnecting: false, hasConnectionError: true });
        console.warn('Error: no matching characteristics found');
        return;
      }

      // subscribe to get notifications
      const isNotifyConnected = await BleUtil.startNotify(
        services.id, characteristic.service, characteristic.characteristic);

      if (!isNotifyConnected) {
        this.setState({ isConnecting: false, hasConnectionError: true });
        console.warn('Error: unable to connect to notify characteristic');
        return;
      }

      // set device data and navigate to game view
      this.props.setBleDeviceData({
        name: services.name,
        id: services.id,
        characteristic,

      }).then(() => {
        this.navigateToGameView(this.props.navigation);
      });

    }).catch((error) => {
      console.warn(`Error connecting to device "${device.name}" - `, error);
      this.setState({ isConnecting: false, hasConnectionError: true });
    });
  }

  onScanAgainPress() {
    if (BleUtil.isBluetoothEnabled()) {
      this.setState({ isScanning: true });
      BleUtil.startScanning(this.onBleDeviceFound, this.onBleScanningStop);
    } else {
      this.setState({ showBluetoothDisabledDialog: true });
    }
  }

  navigateToGameView(navigation) {
    if (navigation) {
      const navigateAction = NavigationActions.navigate({
        routeName: 'GameFrontPage',
      });
      navigation.dispatch(navigateAction);
    }
  }

  renderScanningActivityIndicator(isScanning) {
    if (isScanning) {
      return <ActivityIndicator />;
    }
    return null;
  }

  renderConnectingActivityIndicator(isConnecting) {
    if (isConnecting) {
      return <ActivityIndicator />;
    }
    return null;
  }

  renderScanAgain(isScanning) {
    if (!isScanning) {
      return (
        <Button text={t('pairing.scan_again')} onPress={this.onScanAgainPress} />
      );
    }
    return null;
  }

  renderContent() {
    if (!this.state.isConnecting) {
      return (
        <View>
          <Text>{t('pairing.list_header')}</Text>
          <BleDeviceList bleDeviceList={this.state.bleDeviceList} onPress={this.onBleDevicePress} />
          {this.renderScanningActivityIndicator(this.state.isScanning)}
          {this.renderScanAgain(this.state.isScanning)}
        </View>
      );
    }
    return null;
  }

  renderConnectionErrorModalDialog() {
    return (
      <ModalInfoDialog
        isVisible={this.state.hasConnectionError}
        headerText={t('pairing.connection_error_heading')}
        contentText={t('pairing.connection_error_content')}
        onButtonPress={() => { this.setState({ hasConnectionError: false }); }}
      />
    );
  }

  renderBluetoothDisabledModalDialog() {
    return (
      <ModalInfoDialog
        isVisible={this.state.showBluetoothDisabledDialog}
        headerText={t('pairing.bluetooth_disabled_heading')}
        contentText={t('pairing.bluetooth_disabled_content')}
        onButtonPress={() => { this.setState({ showBluetoothDisabledDialog: false }); }}
      />
    );
  }

  render() {
    return (
      <View>
        {this.renderContent()}
        {this.renderConnectionErrorModalDialog()}
        {this.renderBluetoothDisabledModalDialog()}
        {this.renderConnectingActivityIndicator(this.state.isConnecting)}
      </View>
    );
  }

}


PairingView.propTypes = {
  navigation: PropTypes.object.isRequired,
  setBleDeviceData: PropTypes.func.isRequired,
};


// export connected version
export default connect(PairingContainer.mapProsToWelcomeView,
  PairingContainer.mapDispatchToWelcomeView)(PairingView);
