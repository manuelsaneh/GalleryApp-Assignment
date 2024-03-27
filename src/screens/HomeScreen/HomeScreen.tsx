import {Alert, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../styles/Colors';
import CustomButton from '../../components/atoms/CustomButton';
import {useNavigation} from '@react-navigation/native';
import CameraButton from '../../components/atoms/CameraButton';
import {MainNavigatorNavigationProp} from '../../navigation/MainNavigator.types';
import {useCameraPermission} from 'react-native-vision-camera';
import CameraScreen from '../../components/organisms/Camera';

const HomeScreen = () => {
  const {requestPermission} = useCameraPermission();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const navigation = useNavigation<MainNavigatorNavigationProp>();
  const currentDate = new Date().toDateString();

  const openCamera = () => setIsCameraVisible(true);
  const closeCamera = () => setIsCameraVisible(false);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const handleCameraPermission = async () => {
    const isAccessGranted = await requestPermission();

    if (!isAccessGranted) {
      Alert.alert('Permission required', 'Open settings to grant permission', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open settings',
          style: 'default',
          onPress: async () => {
            await Linking.openSettings();
          },
        },
      ]);
      return;
    }
    openCamera();
  };

  return (
    <>
      {isCameraVisible ? (
        <CameraScreen closeCamera={closeCamera} />
      ) : (
        <View style={styles.root}>
          <View style={styles.containerTop}>
            <View style={styles.top}>
              <CustomButton name="menu-outline" onPress={openDrawer} />
              <View>
                <Text style={styles.titleTop}>Home</Text>
                <Text style={styles.date}>{currentDate}</Text>
              </View>
            </View>
          </View>
          <View style={styles.containerBottom}>
            <View style={styles.innerContainerBottom}>
              <Text style={styles.title}>Take Photo</Text>
              <CameraButton onPress={handleCameraPermission} />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  containerTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },
  top: {
    justifyContent: 'space-between',
  },
  titleContainer: {
    justifyContent: 'flex-end',
  },
  titleTop: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.secondary,
  },
  date: {
    fontFamily: 'Poppins-Light',
    fontSize: 15,
    color: Colors.secondary,
  },
  containerBottom: {
    flex: 3,
    backgroundColor: Colors.secondary,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    justifyContent: 'center',
  },
  innerContainerBottom: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.accent,
  },
});
