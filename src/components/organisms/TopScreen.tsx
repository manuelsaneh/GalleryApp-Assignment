import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from '../atoms/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {MainNavigatorNavigationProp} from '../../navigation/MainNavigator.types';
import {Colors} from '../../styles/Colors';

interface ITopScreenProps {
  title: string;
}

const TopScreen = ({title}: ITopScreenProps) => {
  const navigation = useNavigation<MainNavigatorNavigationProp>();

  const goBack = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.containerTop}>
      <CustomButton name="chevron-back-outline" onPress={goBack} />
      <Text style={styles.titleTop}>{title}</Text>
    </View>
  );
};

export default TopScreen;

const styles = StyleSheet.create({
  containerTop: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 30,
  },
  titleTop: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.secondary,
  },
});
