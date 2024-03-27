import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../styles/Colors';
import {IOnPressProp} from './types/interface';

const CameraButton = ({onPress}: IOnPressProp) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={({pressed}) =>
          pressed ? [styles.button, styles.buttonPressed] : styles.button
        }
        onPress={onPress}>
        <Icon name="camera-outline" size={30} color={Colors.secondary} />
      </Pressable>
    </View>
  );
};

export default CameraButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 55,
    height: 55,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    elevation: 4,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});
