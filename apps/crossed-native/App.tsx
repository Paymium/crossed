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
import AccordionScreen from './src/app/accordion';
import SelectScreen from './src/app/select';
import type { RootStackParamList } from './src/routes';
import SheetScreen from './src/app/sheet';
import TooltipScreen from './src/app/tooltip';
import { CrossedUIProvider } from '@crossed/ui';
import ModalScreen from './src/app/modal.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

const styles = createStyles(() => ({ safeArea: { base: { flex: 1 } } }));

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <CrossedUIProvider>
      <SafeAreaView {...styles.safeArea.style()}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="/index">
            <Stack.Screen name="/index" component={TabOneScreen} />
            <Stack.Screen name="/accordion" component={AccordionScreen} />
            <Stack.Screen name="/button" component={ButtonScreen} />
            <Stack.Screen name="/banner" component={BannerScreen} />
            <Stack.Screen name="/alert" component={AlertScreen} />
            <Stack.Screen name="/sheet" component={SheetScreen} />
            <Stack.Screen name="/select" component={SelectScreen} />
            <Stack.Screen name="/tooltip" component={TooltipScreen} />
            <Stack.Screen name="/modal" component={ModalScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </CrossedUIProvider>
  );
}

export default App;
