/* global jest */

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// configure enzyme
Enzyme.configure({ adapter: new Adapter() });

// configure react-native mocks
require('react-native-mock-render/mock');

// mock localization
jest.mock('react-native-i18n', () => ({
  getLanguages: () => {
    return ['en'];
  },
  t: () => {
    return '';
  },
}));
