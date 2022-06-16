import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './Navigator';
import AppStack from './AppStack';

const Route = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack />
    </NavigationContainer>
  );
};

export default Route;
