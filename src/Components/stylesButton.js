import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {textColor} from '../Assets/Colors';

const styleButton = StyleSheet.create({
  toContainerButton: {
    marginTop: moderateScale(10),
    backgroundColor: textColor.black,
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
  containerText: {
    marginHorizontal: moderateScale(100),
    paddingVertical: moderateScale(10),
  },
  text: {
    color: textColor.white,
    fontWeight: 'bold',
  },
});
export default styleButton;
