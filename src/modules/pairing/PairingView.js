
import _ from 'lodash';
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { NavigationActions } from 'react-navigation';
import { Text, View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

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


const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  button: {
    margin: 20,
  },
});


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
    autoBind(this);
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
      console.debug(`Got valid ble device ${device.name} - ${device.id} - ${device.rssi}`);
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
        this.navigateToGameView();
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

  navigateToGameView() {
    if (this.props.navigation) {
      const navigateAction = NavigationActions.navigate({
        routeName: 'GameFrontPage',
      });
      this.props.navigation.dispatch(navigateAction);
    }
  }

  renderScanningActivityIndicator() {
    if (this.state.isScanning) {
      return <ActivityIndicator />;
    }
    return null;
  }

  renderConnectingActivityIndicator() {
    if (this.state.isConnecting) {
      return <ActivityIndicator />;
    }
    return null;
  }

  renderScanAgain() {
    if (!this.state.isScanning) {
      return (
        <Button
          containerStyle={styles.button}
          text={t('pairing.scan_again')}
          onPress={this.onScanAgainPress}
        />
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
          {this.renderScanningActivityIndicator()}
          {this.renderScanAgain()}
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
      <ScrollView style={styles.container}>
        {this.renderContent()}
        {this.renderConnectionErrorModalDialog()}
        {this.renderBluetoothDisabledModalDialog()}
        {this.renderConnectingActivityIndicator()}
      </ScrollView>
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
