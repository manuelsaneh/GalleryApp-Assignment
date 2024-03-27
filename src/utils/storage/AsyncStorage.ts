import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const savePhotoToStorage = async (uri: string) => {
  try {
    const existingPhotos = await AsyncStorage.getItem('@photos');
    const photos = existingPhotos ? JSON.parse(existingPhotos) : [];

    photos.push({uri});

    await AsyncStorage.setItem('@photos', JSON.stringify(photos));
  } catch (error) {
    Alert.alert('Error Saving Image.', 'Try again.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
    throw error;
  }
};
