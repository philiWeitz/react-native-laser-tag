
import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import GameContainer from './GameContainer';

import BleUtil from '../../util/bleUtil';
import AudioUtil from '../../util/audioUtil';

const BULLETS_AMOUNT = 5;

class GameView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hitCount: 0,
      shotCount: 0,
    };

    this.dataCallback = this.dataCallback.bind(this);
  }

  componentWillMount() {
    BleUtil.setDataCallback(this.dataCallback);
  }

  componentWillUnmount() {
    BleUtil.setDataCallback(null);
  }

  dataCallback(data) {
    console.debug('Data received: ', data);

    if (data.value.startsWith('SHOT')) {
      this.setState({ hitCount: this.state.hitCount + 1 });

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

  render() {
    return (
      <View>
        <Text>Game View</Text>
        <Text>Hit count: ${this.state.hitCount}</Text>
        <Text>Bullets left: ${Math.max(0, this.state.shotCount - BULLETS_AMOUNT)}</Text>
      </View>
    );
  }

}


GameView.propTypes = {

};


// export connected version
export default connect(GameContainer.mapProsToWelcomeView,
  GameContainer.mapDispatchToWelcomeView)(GameView);
