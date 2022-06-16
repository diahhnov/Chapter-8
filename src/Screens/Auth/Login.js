import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import {Formik} from 'formik';
import {moderateScale} from 'react-native-size-matters';
import LoginButton from '../../Components/core/LoginButton';
import StatusBarCore from '../../Components/core/StatusBarCore';
import {backgroundColors, textColor} from '../../Assets/Colors';

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

const {width} = Dimensions.get('screen');

const Login = () => {
  const navigation = useNavigation();

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validateOnMount={true}
      validationSchema={loginSchema}
      onSubmit={values => console.log(values)}>
      {({handleChange, handleBlur, values, touched, errors}) => (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: backgroundColors.fire,
          }}>
          <StatusBarCore />
          <View
            style={{
              alignItems: 'center',
              padding: moderateScale(18),
            }}>
            <Text
              style={{
                color: textColor.black,
                fontSize: moderateScale(28),
                fontWeight: 'bold',
                marginBottom: moderateScale(36),
              }}>
              LOGIN
            </Text>
            <TextInput
              style={{
                width: width - moderateScale(50),
                borderWidth: moderateScale(1),
                borderRadius: moderateScale(8),
                padding: moderateScale(12),
              }}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  fontWeight: '500',
                  marginTop: moderateScale(4),
                  marginBottom: moderateScale(12),
                }}>
                {errors.email}
              </Text>
            ) : (
              <View />
            )}
            <TextInput
              style={{
                marginTop: moderateScale(12),
                width: width - moderateScale(50),
                borderWidth: moderateScale(1),
                borderRadius: moderateScale(8),
                padding: moderateScale(12),
              }}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password ? (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  fontWeight: '500',
                  marginTop: moderateScale(4),
                  marginBottom: moderateScale(12),
                }}>
                {errors.password}
              </Text>
            ) : (
              <View />
            )}
            <LoginButton email={values.email} password={values.password} />
            <View>
              <TouchableOpacity
                style={{
                  marginTop: moderateScale(10),
                }}
                onPress={() => navigation.navigate('Register')}>
                <Text
                  style={{
                    color: textColor.black,
                  }}>
                  New User?, Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Login;
