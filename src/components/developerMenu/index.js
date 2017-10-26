/* global __DEV__ */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStoreUtil from '../../util/asyncStoreUtil';

const DeveloperMenu = () => {

  const renderMenu = () => {
    if (__DEV__) {
      return (
        <View style={{ position: 'absolute', bottom: 10, left: 10, backgroundColor: 'transparent' }}>
          <TouchableOpacity onPress={() => { AsyncStoreUtil.clearStore(); }}>
            <Text>Reset State</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return renderMenu();
};

export default DeveloperMenu;
