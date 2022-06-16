import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {Text, View, StatusBar, SafeAreaView} from 'react-native';
import {textColor} from './src/Assets/Colors';
// import Dashboard from './src/Screens/Home/Dashboard';
import {NativeBaseProvider} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import {store, persistor} from './src/Redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Route from './src/Route';

export default function App(params) {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Route />
      {/* </PersistGate> */}
    </Provider>
  );
}
