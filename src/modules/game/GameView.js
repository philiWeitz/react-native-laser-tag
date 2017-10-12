
import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import GameContainer from './GameContainer';


const GameView = () => {

  return (
    <View>
      <Text>Game View</Text>
    </View>
  );

};


GameView.propTypes = {

};


// export connected version
export default connect(GameContainer.mapProsToWelcomeView,
  GameContainer.mapDispatchToWelcomeView)(GameView);
