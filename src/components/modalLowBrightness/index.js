// @flow

import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import autoBind from 'react-autobind';

import BrightnessUtil from '../../util/brightnessUtil';


type ComponentPropTypes = {
  isVisible: boolean,
  onPress: () => mixed,
};

type ComponentStateTypes = {
  defaultBrightness: number,
};


class ModalLowBrightness extends React.Component<ComponentPropTypes, ComponentStateTypes> {

  constructor(props : ComponentPropTypes) {
    super(props);

    this.state = {
      defaultBrightness: 1.0,
    };

    autoBind(this);
  }

  componentDidUpdate(prevProps: ComponentPropTypes) {
    // got visible -> lower screen brightness
    if (this.props.isVisible && !prevProps.isVisible) {
      this.getCurrentScreenBrightness().then(() => {
        BrightnessUtil.setBrightness(0.0);
      });

    // hidden -> reset screen brightness
    } else if (!this.props.isVisible && prevProps.isVisible) {
      BrightnessUtil.setBrightness(this.state.defaultBrightness);
    }
  }

  async getCurrentScreenBrightness() {
    const brightness = await BrightnessUtil.getBrightness();
    console.debug('Brightness level: ', brightness);
    this.setState({ defaultBrightness: brightness });
  }

  render() {
    if (this.props.isVisible) {
      return (
        <Modal visible transparent animationInTiming={10} animationOutTiming={10}>
          <TouchableWithoutFeedback onPress={this.props.onPress}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        </Modal>
      );
    }
    return null;
  }

}


ModalLowBrightness.propTypes = {
  onPress: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default ModalLowBrightness;
