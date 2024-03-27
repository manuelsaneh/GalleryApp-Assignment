import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type MainNavigatorStackParamList = {
  Home: undefined;
  Gallery: undefined;
  Map: undefined;
};

export type MainNavigatorNavigationProp =
  NativeStackNavigationProp<MainNavigatorStackParamList>;

export type MainNavigatorRouteProp = RouteProp<MainNavigatorStackParamList>;
