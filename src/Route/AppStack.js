import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  CatchScreen,
  Login,
  PokeDexScreen,
  PokemonScreen,
  Register,
} from '../Screens/Screen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PokeDexScreen" component={PokeDexScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
      <Stack.Screen name="CatchScreen" component={CatchScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
