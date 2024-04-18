/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import RN from './src/components/RN';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <>
      <RN.StatusBar translucent={true} backgroundColor={'transparent'} />
      <AppNavigator />
    </>
  );
};

export default App;
