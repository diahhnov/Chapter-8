import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {backgroundColors, textColor} from '../../Assets/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColors.fire,
  },
  containFlatlist: {
    marginHorizontal: moderateScale(18),
    marginTop: moderateScale(24),
  },
  containHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: {
    tintColor: textColor.white,
  },
  textPokeBag: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: textColor.white,
  },
  lengthCatch: {
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(20),
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: textColor.white,
  },
  cardPokemon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 160,
    borderRadius: moderateScale(10),
    elevation: moderateScale(2),
    paddingVertical: moderateScale(8),
    marginHorizontal: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    backgroundColor: textColor.white,
    marginTop: moderateScale(20),
  },
  pokeBall: {
    height: 36,
    width: 36,
    marginRight: moderateScale(10),
  },
});
export default styles;
