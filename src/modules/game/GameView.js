// @flow

import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import Modal from 'react-native-modal';

import GameContainer from './GameContainer';
import Button from '../../components/button';

import BleUtil from '../../util/bleUtil';
import AudioUtil from '../../util/audioUtil';
import BrightnessUtil from '../../util/brightnessUtil';

const BULLETS_AMOUNT = 5;


type PropTypes = {};

type StateTypes = {
  hitCount: number,
  shotCount: number,
  defaultBrightness: number,
  isBrightnessLowered: boolean,
};


class GameView extends React.Component<PropTypes, StateTypes> {

  constructor(props) {
    super(props);

    this.state = {
      hitCount: 0,
      shotCount: 0,
      defaultBrightness: 1.0,
      isBrightnessLowered: false,
    };

    autoBind(this);
    this.getCurrentScreenBrightness();
  }

  componentWillMount() {
    BleUtil.setDataCallback(this.dataCallback);
  }

  componentWillUnmount() {
    BleUtil.setDataCallback(null);
  }

  async getCurrentScreenBrightness() {
    const brightness = await BrightnessUtil.getBrightness();
    console.debug('Brightness level: ', brightness);
    this.setState({ defaultBrightness: brightness });
  }

  setScreenBrightness(brightness) {
    BrightnessUtil.setBrightness(brightness);
    this.setState({ isBrightnessLowered: !this.state.isBrightnessLowered });
  }

  dataCallback(data) {
    console.debug('Data received: ', data);

    if (data.value.startsWith('HIT')) {
      this.setState({ hitCount: this.state.hitCount + 1 });
      AudioUtil.playDying();

    } else if (data.value.startsWith('FIRE')) {
      // if the shot count is bigger than the bullet size -> don't play a sound
      if (this.state.shotCount <= BULLETS_AMOUNT) {
        this.setState({ shotCount: this.state.shotCount + 1 });
        // if the last  bullet was shot -> play the reload sound and reset the shot count
        if (this.state.shotCount === BULLETS_AMOUNT) {
          AudioUtil.playReload().then(() => {
            this.setState({ shotCount: 0 });
          });
        } else {
          AudioUtil.playGunShot();
        }
      }
    }
  }

  renderBrightnessButton() {
    if (this.state.isBrightnessLowered) {
      return (
        <Button
          text="Reset Screen Brightness"
          onPress={() => { this.setScreenBrightness(this.state.defaultBrightness); }}
        />
      );
    }
    return (
      <Button text="Lower Screen Brightness" onPress={() => { this.setScreenBrightness(0.0); }} />
    );
  }

  renderModalOverlay() {
    if (this.state.isBrightnessLowered) {
      return (
        <Modal visible transparent animationInTiming={10} animationOutTiming={10} >
          <TouchableWithoutFeedback
            onPress={() => { this.setScreenBrightness(this.state.defaultBrightness); }}
          >
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        </Modal>
      );
    }
    return null;
  }

  render() {
    return (
      <View>
        <Text>Game View</Text>
        <Text>Hit count: {this.state.hitCount}</Text>
        <Text>Bullets left: {Math.max(0, BULLETS_AMOUNT - this.state.shotCount)}</Text>
        {this.renderBrightnessButton()}
        {this.renderModalOverlay()}
        <KeepAwake />
      </View>
    );
  }

}


GameView.propTypes = {

};


// export connected version
export default connect(GameContainer.mapProsToWelcomeView,
  GameContainer.mapDispatchToWelcomeView)(GameView);
