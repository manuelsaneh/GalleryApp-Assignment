import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {MainNavigatorStackParamList} from './MainNavigator.types';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import GalleryScreen from '../screens/GalleryScreen/GalleryScreen';
import MapScreen from '../screens/MapScreen/MapScreen';
import {Colors} from '../styles/Colors';

const Drawer = createDrawerNavigator<MainNavigatorStackParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: Colors.accent,
        drawerActiveBackgroundColor: Colors.primary,
        drawerActiveTintColor: Colors.secondary,
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Gallery" component={GalleryScreen} />
      <Drawer.Screen name="Map" component={MapScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
