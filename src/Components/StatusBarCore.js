import {StatusBar, useColorScheme} from 'react-native';
import React from 'react';
import {backgroundColors} from '../Assets/Colors';

const StatusBarCore = () => {
  const theme = useColorScheme();

  return theme === 'dark' ? (
    <StatusBar
      barStyle="light-content"
      backgroundColor={backgroundColors.dark}
    />
  ) : (
    <StatusBar
      barStyle="dark-content"
      backgroundColor={backgroundColors.fire}
    />
  );
};

export default StatusBarCore;
