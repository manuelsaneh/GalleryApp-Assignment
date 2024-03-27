import {Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../styles/Colors';
import {IOnPressProp} from './types/interface';

const TakePhotoButton = ({onPress}: IOnPressProp) => {
  return (
    <Pressable onPress={onPress}>
      <Icon name="ellipse-outline" size={80} color={Colors.secondary} />
    </Pressable>
  );
};

export default TakePhotoButton;
