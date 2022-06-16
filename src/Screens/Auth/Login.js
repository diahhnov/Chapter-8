import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import {Formik} from 'formik';
import StatusBarCore from '../../Components/StatusBarCore';
import LoginButton from '../../Components/LoginButton';
import styleAuth from './stylesAuth';

let loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email.')
    .required('Email is required.'),
  password: yup
    .string()
    .min(6, e => `Password must atleast ${e.min} characters.`)
    .required('Password is required.'),
});

const Login = () => {
  const navigation = useNavigation();

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validateOnMount={true}
      validationSchema={loginSchema}
      onSubmit={values => console.log(values)}>
      {({handleChange, handleBlur, values, touched, errors}) => (
        <View style={styleAuth.containerScreen}>
          <StatusBarCore />
          <View style={styleAuth.containerText}>
            <Text style={styleAuth.textH1}>LOGIN</Text>
            <TextInput
              style={styleAuth.tInputEmail}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <Text style={styleAuth.textError}>{errors.email}</Text>
            ) : (
              <View />
            )}
            <TextInput
              style={styleAuth.tInputPassword}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password ? (
              <Text style={styleAuth.textError}>{errors.password}</Text>
            ) : (
              <View />
            )}
            <LoginButton email={values.email} password={values.password} />
            <View>
              <TouchableOpacity
                style={styleAuth.tobotton}
                onPress={() => navigation.navigate('Register')}>
                <Text style={styleAuth.textButton}>New User?, REGISTER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Login;
