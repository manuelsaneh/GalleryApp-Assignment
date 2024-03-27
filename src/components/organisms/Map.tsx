import {StyleSheet, View} from 'react-native';
import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Location} from '../../utils/store/LocationContext';

interface IMapProps {
  location: Location[];
}

const Map = ({location}: IMapProps) => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        region={{
          latitude: 33.8938,
          longitude: 35.5018,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {location.map(
          (
            loc: {latitude: any; longitude: any},
            index: React.Key | null | undefined,
          ) => (
            <Marker
              key={index}
              coordinate={{
                latitude: loc?.latitude,
                longitude: loc?.longitude,
              }}
            />
          ),
        )}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
