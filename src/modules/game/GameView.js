// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Text, View } from 'react-native';
import KeepAwake from 'react-native-keep-awake';

import GameContainer from './GameContainer';
import { Button, ModalLowBrightness } from '../../components';

import BleUtil from '../../util/bleUtil';
import AudioUtil from '../../util/audioUtil';

const BULLETS_AMOUNT = 5;


type ComponentPropTypes = {};

type ComponentStateTypes = {
  hitCount: number,
  shotCount: number,
  isBrightnessLowered: boolean,
  bleOutput: string,
};


class GameView extends React.Component<ComponentPropTypes, ComponentStateTypes> {

  constructor(props) {
    super(props);

    this.state = {
      hitCount: 0,
      shotCount: 0,
      isBrightnessLowered: false,
      bleOutput: '',
    };

    autoBind(this);
  }

  componentWillMount() {
    BleUtil.setDataCallback(this.dataCallback);
  }

  componentWillUnmount() {
    BleUtil.setDataCallback(null);
  }

  dataCallback(data) {
    console.debug('Data received: ', data);
    this.setState({ bleOutput: data.value });

    if (_.startsWith(data.value, 'HIT')) {
      this.setState({ hitCount: this.state.hitCount + 1 });
      AudioUtil.playDying();

    } else if (_.startsWith(data.value, 'FIRE')) {
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
    return (
      <Button
        containerStyle={{ marginTop: 20 }}
        text="Lower Screen Brightness"
        onPress={() => { this.setState({ isBrightnessLowered: true }); }}
      />
    );
  }

  renderModalLowBrightness() {
    return (
      <ModalLowBrightness
        isVisible={this.state.isBrightnessLowered}
        onPress={() => { this.setState({ isBrightnessLowered: false }); }}
      />
    );
  }

  render() {
    return (
      <View>
        <Text>Game View</Text>
        <Text>Hit count: {this.state.hitCount}</Text>
        <Text>Bullets left: {Math.max(0, BULLETS_AMOUNT - this.state.shotCount)}</Text>
        {this.renderBrightnessButton()}
        {this.renderModalLowBrightness()}
        <Text style={{ marginTop: 20 }}>{this.state.bleOutput}</Text>
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
