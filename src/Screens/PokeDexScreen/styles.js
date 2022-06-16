import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {backgroundColors, textColor} from '../../Assets/Colors';

const styles = StyleSheet.create({
  containerHeader: {
    paddingVertical: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: moderateScale(5),
  },
  textPokeDex: {
    color: textColor.white,
    fontWeight: 'bold',
    fontSize: moderateScale(18),
  },
  toPokeBag: {
    color: textColor.white,
    fontWeight: 'bold',
  },
  textPokeBag: {
    color: textColor.white,
    fontWeight: 'bold',
    fontSize: moderateScale(18),
  },
  containerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: moderateScale(6),
    marginVertical: moderateScale(24),
  },
  toSebelum: {
    paddingVertical: moderateScale(18),
    paddingHorizontal: moderateScale(28),
    borderRadius: moderateScale(10),
    backgroundColor: backgroundColors.ground,
  },
  textSebelum: {
    color: textColor.white,
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  number: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  toSesudah: {
    paddingVertical: moderateScale(18),
    paddingHorizontal: moderateScale(28),
    borderRadius: moderateScale(10),
    backgroundColor: backgroundColors.ice,
  },
  textSesudah: {
    color: textColor.black,
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  containerScreen: {flex: 1, backgroundColor: backgroundColors.fire},
  screen: {
    marginHorizontal: moderateScale(18),
    marginTop: moderateScale(24),
  },
  actIndicator: {
    color: textColor.black,
    width: 200,
    height: 100,
  },
  cardPokemon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: textColor.white,
    elevation: moderateScale(2),
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    marginVertical: moderateScale(12),
    marginHorizontal: moderateScale(8),
    width: 160,
    borderRadius: moderateScale(7),
  },
  pokeBall: {
    height: 36,
    width: 36,
    marginRight: moderateScale(10),
  },
  namePokemon: {fontStyle: 'italic', color: textColor.black},
});
export default styles;
