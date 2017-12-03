/* global navigator */

import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import _ from 'lodash';
import Map from 'react-native-maps';
import autoBind from 'react-autobind';

import Icon from 'react-native-vector-icons/MaterialIcons';

const { height, width } = Dimensions.get('window');

const LOCATION_CONFIG = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000,
};


const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
  },
  icon: {
    backgroundColor: 'transparent',
    color: '#900',
  },
});


class MapView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lastPosition: null,
      editMarker: false,
      userMarker: {},
    };

    autoBind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ lastPosition: position.coords });
    }, (error) => {
      console.error('Error getting geo location', error.message);
    }, LOCATION_CONFIG);

    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({ lastPosition: position.coords });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onMapPress(e) {
    if (this.state.editMarker) {
      const key = `${e.nativeEvent.coordinate.longitude}-${e.nativeEvent.coordinate.latitude}`;

      if (this.state.userMarker[key]) {
        delete this.state.userMarker[key];
      } else {
        this.state.userMarker[key] = e.nativeEvent.coordinate;
      }
      this.setState({userMarker: this.state.userMarker});
    }
  }

  onToggleMenuItem(key) {
    this.setState({ [key]: !this.state[key] });
  }

  renderMap() {
    if (this.state.lastPosition) {
      return (
        <Map
          style={{ width, height }}
          onPress={this.onMapPress}
          initialRegion={{
            latitude: this.state.lastPosition.latitude,
            longitude: this.state.lastPosition.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
          }}
        >
          <Map.Marker
            coordinate={{
              latitude: this.state.lastPosition.latitude,
              longitude: this.state.lastPosition.longitude,
            }}
          />
          {_.map(this.state.userMarker, (marker) => {
            return (
              <Map.Marker
                key={`${marker.latitude}-${marker.longitude}`}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
              />
            );
          })}
        </Map>
      );
    }
    return null;
  }

  renderLoadingIndicator() {
    if (!this.state.lastPosition) {
      return <ActivityIndicator />;
    }
    return null;
  }

  renderEditBar() {
    const selectedStyle = this.state.editMarker ? { color: 'red' } : null;

    return (
      <View style={styles.iconContainer}>
        <Icon
          size={30}
          name="edit-location"
          style={[styles.icon, selectedStyle]}
          onPress={() => { this.onToggleMenuItem('editMarker'); }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{ width, height }} >
        {this.renderLoadingIndicator()}
        {this.renderMap()}
        {this.renderEditBar()}
      </View>
    );
  }

}

export default MapView;
