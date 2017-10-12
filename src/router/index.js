
import {
  NavigationActions,
  StackNavigator,
} from 'react-navigation';

import WelcomeView from '../modules/welcome/WelcomeView';
import PairingView from '../modules/pairing/PairingView';
import GameView from '../modules/game/GameView';


const headerOptions = {
  headerBackTitle: null,
  headerTruncatedBackTitle: null,
};


const IntroductionNavigator = StackNavigator({
  Intro: {
    screen: WelcomeView,
    navigationOptions: {
      title: 'Laser Tag',
      ...headerOptions,
    },
  },
  Pairing: {
    screen: PairingView,
    navigationOptions: {
      title: 'Pairing',
      ...headerOptions,
    },
  },
}, {
  initialRouteName: 'Intro',
  backBehavior: 'initialRoute',
  headerBackTitle: null,
});


const GameNavigator = StackNavigator({
  GameFrontPage: {
    screen: GameView,
    navigationOptions: {
      title: 'Game',
      ...headerOptions,
    },
  },
}, {
  initialRouteName: 'GameFrontPage',
  backBehavior: 'initialRoute',
  headerBackTitle: null,
});


const navigateOnce = (getStateForAction) => (action, state) => {
  const { type, routeName } = action;

  return (
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
  ) ? null : getStateForAction(action, state);
};


IntroductionNavigator.router.getStateForAction =
  navigateOnce(IntroductionNavigator.router.getStateForAction);
GameNavigator.router.getStateForAction =
  navigateOnce(GameNavigator.router.getStateForAction);


export {
  GameNavigator,
  IntroductionNavigator,
};
