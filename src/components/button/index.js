
import React from 'react';
import {
  Text,
  StyleSheet,
  ViewPropTypes,
  TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: 'gray',
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
});


const Button = ({ text, onPress, containerStyle }) => {

  const onButtonPress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={onButtonPress}>
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyle: ViewPropTypes.style,
};

Button.defaultProps = {
  containerStyle: {},
};

export default Button;