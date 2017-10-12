

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

import Button from '../button';

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
});


const ModalInfoDialog = ({ isVisible, headerText, contentText, onButtonPress }) => {

  const onOkButtonClick = () => {
    if (onButtonPress) {
      onButtonPress();
    }
  };

  const renderHeader = () => {
    return (
      <View>
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View>
        <Text style={styles.bodyText}>{contentText}</Text>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <Button text="OK" onPress={onOkButtonClick} />
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

ModalInfoDialog.propTypes = {
  isVisible: PropTypes.bool,
  headerText: PropTypes.string,
  contentText: PropTypes.string,
  onButtonPress: PropTypes.func.isRequired,
};

ModalInfoDialog.defaultProps = {
  isVisible: false,
  headerText: '',
  contentText: '',
};

export default ModalInfoDialog;
