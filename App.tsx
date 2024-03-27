import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {PhotoProvider} from './src/utils/store/ImageContext';
import {enableLatestRenderer} from 'react-native-maps';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {LocationProvider} from './src/utils/store/LocationContext';

enableLatestRenderer();
function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.root}>
      <LocationProvider>
        <PhotoProvider>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </PhotoProvider>
      </LocationProvider>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
