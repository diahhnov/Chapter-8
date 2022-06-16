import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setLoad} from '../Redux/slices/globalSlice';
import {setRegister} from '../Redux/slices/userSlice';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import styleButton from './stylesButton';

const RegisterButton = ({name, email, password, image, bio}) => {
  const dispatch = useDispatch();
  const {isLoad} = useSelector(state => state.global);

  const saveUserCredentialsToFirebase = id => {
    const reference = database().ref(`/users/${id}`);

    if (image === '') {
      image =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQudhbFG-3Q4clb7ryhoT7PoyDHfpde8Ke4w&usqp=CAU';
    }
    const dataContent = {
      id: id,
      name: name,
      email: email,
      image: image,
      bio: bio,
    };
    try {
      reference.set(dataContent);
      dispatch(setRegister(dataContent));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoad(false));
    }
  };

  const validationCheck = () => {
    const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-z]/;
    const emailStatus = emailRegex.test(email);

    if (email.length === 0 && password.length === 0) {
      Alert.alert('Error', 'Please fill Register form correctly');
      console.log('this');
    } else {
      if (emailStatus && password.length >= 6) {
        dispatch(setLoad(true));
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(result => {
            saveUserCredentialsToFirebase(result.user.uid);
          })
          .catch(error => {
            Alert.alert('Error', error.message);
            dispatch(setLoad(false));
          });
      } else {
        Alert.alert('Error');
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
          <Text style={styleButton.text}>Sign Up</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RegisterButton;
