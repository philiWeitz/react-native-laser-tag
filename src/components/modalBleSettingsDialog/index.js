// @flow

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import BleUtil from '../../util/bleUtil';

import Button from '../button';
import t from '../../util/locale';

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 16,
    marginBottom: 10,
  },
  bodyText: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 15,
  },
});


const ModalBleSettingsDialog = ({ isVisible, onButtonPress } : {
  isVisible : boolean, onButtonPress : () => null }) => {

  const onOkButtonClick = () => {
    if (onButtonPress) {
      onButtonPress();
    }
  };

  const onEnableButtonClick = async () => {
    await BleUtil.openBluetoothSettings();
    if (onButtonPress) {
      onButtonPress();
    }
  };

  const renderHeader = () => {
    return (
      <View>
        <Text style={styles.headerText}>{t('pairing.bluetooth_disabled_heading')}</Text>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View>
        <Text style={styles.bodyText}>{t('pairing.bluetooth_disabled_content')}</Text>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.buttonContainer}>
        <Button containerStyle={styles.button} text={t('button.cancel')} onPress={onOkButtonClick} />
        <Button containerStyle={styles.button} text={t('button.enable')} onPress={onEnableButtonClick} />
      </View>
    );
  };

  const renderContent = () => {
    if (isVisible) {
      return (
        <Modal isVisible={isVisible}>
          <View style={styles.modalContainer}>
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
          </View>
        </Modal>
      );
    }
    return null;
  };

  return renderContent();
};

ModalBleSettingsDialog.propTypes = {
  isVisible: PropTypes.bool,
  onButtonPress: PropTypes.func.isRequired,
};

ModalBleSettingsDialog.defaultProps = {
  isVisible: false,
};

export default ModalBleSettingsDialog;
