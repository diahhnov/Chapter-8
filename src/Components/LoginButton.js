import {
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {setLoad} from '../Redux/slices/globalSlice';
import {setLogin} from '../Redux/slices/userSlice';
import styleButton from './stylesButton';

const LoginButton = ({email, password}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isLoad} = useSelector(state => state.global);

  const getCredentialsFromFirebase = id => {
    const reference = database().ref(`/users/${id}`);
    try {
      reference.on('value', snapshot => {
        dispatch(setLogin(snapshot.val()));
      });
      navigation.navigate('PokeDexScreen');
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoad(false));
    }
  };

  const validationCheck = () => {
    const emailRegEx = /[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-z]/;
    const emailStatus = emailRegEx.test(email);

    if (email.length === 0 && password.length === 0) {
      Alert.alert('Error', 'Empty form, Please fill form correctly!');
    } else {
      if (emailStatus && password.length >= 6) {
        dispatch(setLoad(true));
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(res => {
            getCredentialsFromFirebase(res.user.uid);
          })
          .catch(error => {
            Alert.alert('Error', error.message);
            dispatch(setLoad(false));
          });
      } else {
        Alert.alert('Error', 'Invalid Form!');
        dispatch(setLoad(false));
      }
    }
  };

  return (
    <TouchableOpacity
      style={styleButton.toContainerButton}
      onPress={() => validationCheck()}>
      {isLoad ? (
        <ActivityIndicator />
      ) : (
        <View style={styleButton.containerText}>
          <Text style={styleButton.text}>Sign In</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default LoginButton;
