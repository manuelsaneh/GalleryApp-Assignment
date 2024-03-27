import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

interface IButtonProps {
  name: string;
  onPress: () => void;
}

const CustomButton = ({onPress, name}: IButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={({pressed}) =>
          pressed ? [styles.button, styles.buttonPressed] : styles.button
        }
        onPress={onPress}>
        <Icon name={name} size={25} color={Colors.secondary} />
      </Pressable>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 50,
    height: 55,
    borderColor: Colors.secondary,
    borderWidth: 1,
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
