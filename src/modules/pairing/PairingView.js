
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Text, View, ActivityIndicator } from 'react-native';

import BleUtil from '../../util/bleUtil';
import AudioUtil from '../../util/audioUtil';
import PairingContainer from './PairingContainer';

import Button from '../../components/button';
import BleDeviceList from '../../components/bleDeviceList';
import ModalInfoDialog from '../../components/modalInfoDialog';


class PairingView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bleDeviceList: List([]),
      isScanning: true,
      isConnecting: false,
      hasConnectionError: false,
    };

    this.onScanAgainPress = this.onScanAgainPress.bind(this);
    this.onBleDevicePress = this.onBleDevicePress.bind(this);
    this.onBleDeviceFound = this.onBleDeviceFound.bind(this);
    this.onBleScanningStop = this.onBleScanningStop.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderConnectionErrorModalDialog = this.renderConnectionErrorModalDialog.bind(this);
  }

  componentWillMount() {
    BleUtil.initBleUtil().then(() => {
      BleUtil.startScanning(this.onBleDeviceFound, this.onBleScanningStop);
    });
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

      if (!services) {
        this.setState({ isConnecting: false, hasConnectionError: true });
        console.warn('Error connecting to device');
        return;
      }

      if (!services.characteristics || services.characteristics.size <= 0) {
        this.setState({ isConnecting: false, hasConnectionError: true });
        console.warn('Error: no characteristics found');
        return;
      }

      this.props.setBleDeviceData({
        name: services.name,
        id: services.id,
        characteristic: services.characteristics[0],

      }).then(() => {
        this.navigateToGameView(this.props.navigation);
      });

    }).catch((error) => {
      console.warn(`Error connecting to device "${device.name}" - `, error);
      this.setState({ isConnecting: false, hasConnectionError: true });
    });
  }

  onScanAgainPress() {
    this.setState({ isScanning: true });
    BleUtil.startScanning(this.onBleDeviceFound, this.onBleScanningStop);
    AudioUtil.playGunShot();
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
        <Button text="Scan Again" onPress={this.onScanAgainPress} />
      );
    }
    return null;
  }

  renderContent() {
    if (!this.state.isConnecting) {
      return (
        <View>
          <Text>BLE Devices:</Text>
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
        headerText="Connection Error"
        contentText="Unable to connect to device."
        onButtonPress={() => { this.setState({ hasConnectionError: false }); }}
      />
    );
  }

  render() {
    return (
      <View>
        {this.renderContent()}
        {this.renderConnectionErrorModalDialog()}
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
