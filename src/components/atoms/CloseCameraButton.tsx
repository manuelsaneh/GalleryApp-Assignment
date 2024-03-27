import {Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../styles/Colors';
import {IOnPressProp} from './types/interface';

const CloseCameraButton = ({onPress}: IOnPressProp) => {
  return (
    <Pressable onPress={onPress}>
      <Icon name="close-outline" size={35} color={Colors.secondary} />
    </Pressable>
  );
};

export default CloseCameraButton;
