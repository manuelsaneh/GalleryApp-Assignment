import {Alert, StyleSheet, View} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import CloseCameraButton from '../atoms/CloseCameraButton';
import TakePhotoButton from '../atoms/TakePhotoButton';
import {usePhotoContext} from '../../utils/store/ImageContext';
import {useLocationContext} from '../../utils/store/LocationContext';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {MainNavigatorNavigationProp} from '../../navigation/MainNavigator.types';

interface ICamProps {
  closeCamera: () => void;
}

const CameraScreen = ({closeCamera}: ICamProps) => {
  const {addPhoto} = usePhotoContext();
  const {addLocation} = useLocationContext();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const navigation = useNavigation<MainNavigatorNavigationProp>();

  const navigateToGallery = () => {
    navigation.navigate('Gallery');
  };

  const saveImageToApi = async (uri: string): Promise<string> => {
    try {
      const response = await axios.post(
        'https://6602d89e9d7276a75554641c.mockapi.io/api/v1/images',
        {uri},
      );
      return response.data;
    } catch (error) {
      Alert.alert("Couldn't save image.", 'Try again.', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
      throw error;
    }
  };

  const takePhoto = async () => {
    const photo = await camera.current?.takePhoto();
    addPhoto({
      id: JSON.stringify(photo?.path),
      uri: `file://${photo!.path}`,
    });
    requestLocationPermission();
    saveImageToApi(`file://${photo!.path}`);
    closeCamera();
    navigateToGallery();
  };

  const getCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (position: {coords: {latitude: number; longitude: number}}) => {
        addLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error: {message: string}) => {
        Alert.alert(`Error getting location: ${error.message}`);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [addLocation]);

  const requestLocationPermission = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to function properly.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        Alert.alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }, [getCurrentLocation]);

  return (
    <View style={styles.cam}>
      <View style={styles.closeButtonContainer}>
        <CloseCameraButton onPress={closeCamera} />
      </View>
      <Camera
        style={StyleSheet.absoluteFill}
        ref={camera}
        device={device!}
        isActive={true}
        photo={true}
      />
      <View style={styles.takePhotoContainer}>
        <TakePhotoButton onPress={takePhoto} />
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  cam: {
    flex: 1,
  },
  closeButtonContainer: {
    zIndex: 1,
    alignItems: 'flex-end',
    margin: 30,
  },
  takePhotoContainer: {
    flex: 1,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 40,
  },
});
