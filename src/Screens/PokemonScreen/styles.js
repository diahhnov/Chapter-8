import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {backgroundColors, textColor} from '../../Assets/Colors';

const styles = StyleSheet.create({
  containerScreen: {flex: 1, backgroundColor: backgroundColors.fire},
  containerHeader: {
    marginHorizontal: moderateScale(12),
    marginTop: moderateScale(24),
  },
  backgroundHeader: {
    padding: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: {
    tintColor: textColor.white,
  },
  textPokemonDetail: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: textColor.white,
  },
  textCatch: {
    fontWeight: 'bold',
    color: textColor.white,
  },
  catchMe: {
    fontWeight: 'bold',
    color: textColor.white,
  },
  containerImagePokemon: {alignItems: 'center', paddingTop: moderateScale(50)},
  imagePokemon: {
    width: moderateScale(150),
    height: moderateScale(150),
  },
  containerNamePokemon: {
    marginTop: moderateScale(24),
    alignItems: 'center',
  },
  namePokemon: {
    fontSize: moderateScale(50),
    fontWeight: 'bold',
    color: textColor.white,
  },
  containerInformation: {
    borderRadius: moderateScale(12),
    margin: moderateScale(8),
    padding: moderateScale(12),
  },
  text: {fontWeight: 'bold'},
  containerTypes: {
    marginHorizontal: moderateScale(10),
    marginBottom: moderateScale(18),
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(12),
  },
  types: {
    margin: moderateScale(4),
  },
  containerAbl: {
    marginHorizontal: moderateScale(10),
    marginBottom: moderateScale(18),
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(12),
  },
  moves: {
    marginBottom: moderateScale(6),
    fontWeight: 'bold',
  },
  manyMoves: {
    padding: moderateScale(8),
    fontSize: 16,
    backgroundColor: backgroundColors.ground,
    margin: moderateScale(12),
    width: 150,
    borderRadius: moderateScale(8),
  },
});
export default styles;
