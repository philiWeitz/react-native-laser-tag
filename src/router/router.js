
import React from 'react';

import {
  NavigationActions,
  TabBarBottom,
  StackNavigator,
  TabNavigator
} from 'react-navigation';

import WelcomeView from '../modules/welcome/WelcomeView';
import PairingView from '../modules/pairing/PairingView';


const IntroductionNavigator = StackNavigator({
  Intro: {
    screen: WelcomeView,
  },
  Pairing: {
    screen: PairingView,
  },
}, {
  initialRouteName: 'Intro',
  backBehavior: 'initialRoute',
  headerBackTitle: null
});


const navigateOnce = (getStateForAction) => (action, state) => {
  const {type, routeName, customAction} = action;

  return (
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
  ) ? null : getStateForAction(action, state);
};


IntroductionNavigator.router.getStateForAction = navigateOnce(IntroductionNavigator.router.getStateForAction);


export {
  IntroductionNavigator,
};
