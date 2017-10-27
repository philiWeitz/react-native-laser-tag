// @flow

import React from 'react';
import {
  StyleSheet,
  ViewPropTypes,
} from 'react-native';

import PropTypes from 'prop-types';
import { Button as ButtonNativeElement } from 'react-native-elements';

import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#008CBA',
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
});


type ComponentPropTypes = {
  text: string,
  onPress: () => mixed,
  containerStyle?: StyleObj,
  iconRight?: Object,
  iconLeft?: Object,
};


const Button = ({ text, onPress, containerStyle, iconRight, iconLeft }
  : ComponentPropTypes) => {

  const onButtonPress = () => {
    if (onPress) {
      onPress();
    }
  };

  const renderContent = () => {
    return (
      <ButtonNativeElement
        raised
        iconRight={iconRight}
        icon={iconLeft}
        title={text}
        borderRadius={5}
        onPress={onButtonPress}
        textStyle={{ textAlign: 'center' }}
        buttonStyle={[styles.container, containerStyle]}
      />
    );
  };

  return renderContent();
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyle: ViewPropTypes.style,
  iconRight: PropTypes.object,
  iconLeft: PropTypes.object,
};

Button.defaultProps = {
  containerStyle: {},
  icon: {},
  iconLeft: {},
  iconRight: {},
};

export default Button;
