import React from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import StatusBarCore from '../../Components/StatusBarCore';
import RegisterButton from '../../Components/RegisterButton';
import styleAuth from './stylesAuth';

let registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email.')
    .required('Email is required.'),
  password: yup
    .string()
    .min(6, e => `Password must atleast ${e.min} characters.`)
    .required('Password is required.'),
  name: yup.string().required('Name is required.'),
});

export default function Register() {
  const navigation = useNavigation();

  return (
    <Formik
      initialValues={{email: '', password: '', name: ''}}
      validateOnMount={true}
      validationSchema={registerSchema}
      onSubmit={values => console.log(values)}>
      {({handleChange, handleBlur, values, touched, errors}) => (
        <View style={styleAuth.containerScreen}>
          <StatusBarCore />
          <View style={styleAuth.containerText}>
            <Text style={styleAuth.textH1}>REGISTER</Text>
            <TextInput
              style={styleAuth.tInputEmail}
              placeholder="Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {errors.name && touched.name ? (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  fontWeight: '500',
                  marginTop: moderateScale(4),
                  marginBottom: moderateScale(12),
                }}>
                {errors.name}
              </Text>
            ) : (
              <View />
            )}
            <TextInput
              style={styleAuth.tInputEmailRegister}
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
            <RegisterButton
              name={values.name}
              email={values.email}
              password={values.password}
            />
            <TouchableOpacity
              style={styleAuth.tobotton}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styleAuth.textBotton}>Back to LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
}
