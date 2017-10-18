/* global describe, it, expect */

import React from 'react';
import { shallow } from 'enzyme';
import enzymeToJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import WelcomeViewConnected from '../../src/modules/welcome/WelcomeView';


const mockStore = configureStore([]);

const navProp = {
  navigation: {},
};


describe('welcome-view-connected-tests', () => {

  it('shallow welcome view snapshot test', () => {
    const wrapper = shallow(
      <WelcomeViewConnected navigation={navProp} />,
      { context: { store: mockStore({}) } },
    );
    expect(enzymeToJson(wrapper.dive())).toMatchSnapshot();
  });

});
