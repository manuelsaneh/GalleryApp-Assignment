import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../styles/Colors';
import {IOnPressProp} from './types/interface';

const SaveButton = ({onPress}: IOnPressProp) => {
  return (
    <Pressable style={styles.buttonContainer}>
      <View>
        <Icon
          onPress={onPress}
          name="download-outline"
          size={30}
          color={Colors.primary}
        />
      </View>
    </Pressable>
  );
};

export default SaveButton;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
