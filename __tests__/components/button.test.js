/* global describe, it, expect */

import React from 'react';
import { shallow } from 'enzyme';
import enzymeToJson from 'enzyme-to-json';

import Button from '../../src/components/button/index';


describe('component-button-tests', () => {

  it('button snapshot test', () => {
    const wrapper = shallow(
      <Button text={'Button Test'} onPress={() => {}} />,
    );
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });

  it('button press test', () => {
    const buttonCaption = 'Button Test';
    const wrapper = shallow(
      <Button text={buttonCaption} onPress={() => {}} />,
    );

    expect(wrapper.contains(buttonCaption)).toBe(true);
  });

});
