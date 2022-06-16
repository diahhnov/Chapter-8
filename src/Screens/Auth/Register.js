import React from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';

import {moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import StatusBarCore from '../../Components/core/StatusBarCore';
import RegisterButton from '../../Components/core/RegisterButton';
import {backgroundColors, textColor} from '../../Assets/Colors';

const {width} = Dimensions.get('window');

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
  image: yup.string().required('Image is required.'),
  bio: yup.string().required('Bio is required.'),
});

export default function Register() {
  const navigation = useNavigation();

  return (
    <Formik
      initialValues={{email: '', password: '', name: '', image: '', bio: ''}}
      validateOnMount={true}
      validationSchema={registerSchema}
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
                color: 'black',
                fontSize: moderateScale(28),
                fontWeight: 'bold',
                marginBottom: moderateScale(36),
              }}>
              REGISTER
            </Text>
            <TextInput
              style={{
                width: width - moderateScale(50),
                borderWidth: moderateScale(1),
                borderRadius: moderateScale(8),
                padding: moderateScale(12),
              }}
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
              style={{
                width: width - moderateScale(50),
                borderWidth: moderateScale(1),
                borderRadius: moderateScale(8),
                padding: moderateScale(12),
                marginTop: moderateScale(12),
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
                width: width - moderateScale(50),
                borderWidth: moderateScale(1),
                borderRadius: moderateScale(8),
                padding: moderateScale(12),
                marginTop: moderateScale(12),
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
            <TextInput
              style={{
                width: width - moderateScale(50),
                borderWidth: moderateScale(1),
                borderRadius: moderateScale(8),
                padding: moderateScale(12),
                marginTop: moderateScale(12),
              }}
              placeholder="Image URL"
              onChangeText={handleChange('image')}
              onBlur={handleBlur('image')}
              value={values.image}
            />
            {errors.image && touched.image ? (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  fontWeight: '500',
                  marginTop: moderateScale(4),
                  marginBottom: moderateScale(12),
                }}>
                {errors.image}
              </Text>
            ) : (
              <View />
            )}
            <RegisterButton
              name={values.name}
              email={values.email}
              password={values.password}
              image={values.image}
              bio={values.bio}
            />
            <TouchableOpacity
              style={{
                borderRadius: moderateScale(6),
                marginTop: moderateScale(10),
              }}
              onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  color: textColor.black,
                }}>
                Back to LOGIN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
}
