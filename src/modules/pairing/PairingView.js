
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import PairingContainer from './PairingContainer';

const PairingView = ({gunName}) => {

  const renderGunInfo = () => {
    if (gunName) {
      return (
        <Text>{gunName}</Text>
      );
    }
    return null;
  };

  return (
    <View>
      <Text>TEST</Text>
      {renderGunInfo()}
    </View>
  );
};

PairingView.propTypes = {
  gunName: PropTypes.string,
};

// export connected version
export default connect(PairingContainer.mapProsToWelcomeView,
  PairingContainer.mapDispatchToWelcomeView)(PairingView);