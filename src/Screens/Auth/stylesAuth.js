import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {backgroundColors, textColor} from '../../Assets/Colors';

const {width} = Dimensions.get('screen');

const styleAuth = StyleSheet.create({
  containerScreen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: backgroundColors.fire,
  },
  containerText: {
    alignItems: 'center',
    padding: moderateScale(18),
  },
  textH1: {
    color: textColor.black,
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    marginBottom: moderateScale(36),
  },
  tInputEmailRegister: {
    width: width - moderateScale(50),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    marginTop: moderateScale(12),
  },
  tInputEmail: {
    width: width - moderateScale(50),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
  },
  textError: {
    fontSize: 12,
    color: textColor.red,
    fontWeight: '500',
    marginTop: moderateScale(4),
    marginBottom: moderateScale(12),
  },
  tInputPassword: {
    marginTop: moderateScale(12),
    width: width - moderateScale(50),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
  },
  tobotton: {
    marginTop: moderateScale(10),
  },
  textBotton: {
    color: textColor.black,
  },
});
export default styleAuth;
