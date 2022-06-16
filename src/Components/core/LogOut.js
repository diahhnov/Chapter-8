import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
setLogout;

import auth from '@react-native-firebase/auth';
import {setLogout} from '../../Redux/slices/authSlices';
import {moderateScale} from 'react-native-size-matters';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(setLogout());
        navigation.navigate('Login');
      });
  };

  return (
    <TouchableOpacity onPress={() => onLogout()} style={styles.button}>
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    padding: moderateScale(12),
    borderRadius: moderateScale(6),
    marginBottom: moderateScale(24),
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
});
