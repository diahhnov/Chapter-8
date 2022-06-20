import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import {store} from './src/Redux/store';
import {Provider} from 'react-redux';
import Route from './src/Route';
import CodePush from 'react-native-code-push';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};
export default CodePush(codePushOptions)(App);
