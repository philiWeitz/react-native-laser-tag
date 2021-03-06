/* global describe, it, expect */

import React from 'react';
import { shallow } from 'enzyme';
import enzymeToJson from 'enzyme-to-json';

import { Button as ReactNativeButton } from 'react-native-elements';
import Button from '../../src/components/button/index';


describe('component-button-tests', () => {

  it('button snapshot test', () => {
    const wrapper = shallow(
      <Button text="Button Test" onPress={() => {}} />,
    );
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });

  it('button press test', () => {
    let buttonPressed = false;
    const wrapper = shallow(
      <Button onPress={() => { buttonPressed = true; }} text="Button Test" />,
    );

    wrapper.find(ReactNativeButton).simulate('press');
    expect(buttonPressed).toBe(true);
  });

});
