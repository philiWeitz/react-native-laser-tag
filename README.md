
| Type          |              |
| :-------------| :------------|
| Travis CI     | [![Build Status](https://travis-ci.org/philiWeitz/react-native-laser-tag.svg?branch=development)](https://travis-ci.org/philiWeitz/react-native-laser-tag) |
| React         | [![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=16.0.0-beta.5&x2=0)](https://reactjs.org/docs/hello-world.html) |
| React native  | [![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=0.49.3&x2=0)](http://facebook.github.io/react-native/releases/0.49) |

# React Native Laser Tag

Mobile app for an Arduino based laser tag system.

## Setup

1. Install React Native:
  - https://facebook.github.io/react-native/docs/getting-started.html

2. Create .env file:
  - navigate to project root directory and create file: config/.env
  ```
  touch config/.env
  ```
  - supports the following variables:
    - GOOGLE_MAPS_API_KEY=<API key for google maps>

3. Install Yarn
  ```
  brew install yarn
  ```

4. Install NPM packages
  ```
  yarn install
  ```
  
5. Connect your Android device and build the project
  ```
  yarn android-dev
  ```
  
## Tests

The project contains unit and UI tests as well as an eslint check. Tests are executed before each push using the Husky package. Use the following command to run the tests locally:
```
yarn ci
```
