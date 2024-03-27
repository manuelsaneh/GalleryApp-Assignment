import React from 'react';
import Map from '../../components/organisms/Map';
import {useLocationContext} from '../../utils/store/LocationContext';
import TopScreen from '../../components/organisms/TopScreen';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../styles/Colors';

const MapScreen = () => {
  const {location} = useLocationContext();

  return (
    <View style={styles.root}>
      <TopScreen title="Map" />
      <View style={styles.mapContainer}>
        <Map location={location} />
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  mapContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
