/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import TabOneScreen from './src/app';
import ButtonScreen from './src/app/button';
import { BannerScreen } from './src/app/banner';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStyles } from '@crossed/styled';
import { AlertScreen } from './src/app/alert';
import type { RootStackParamList } from './src/routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const styles = createStyles(() => ({ safeArea: { base: { flex: 1 } } }));

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView {...styles.safeArea.style()}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="/index">
          <Stack.Screen name="/index" component={TabOneScreen} />
          <Stack.Screen name="/button" component={ButtonScreen} />
          <Stack.Screen name="/banner" component={BannerScreen} />
          <Stack.Screen name="/alert" component={AlertScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
