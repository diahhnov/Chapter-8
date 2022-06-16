import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCatch, setLoad} from '../../Redux/slices/globalSlice';
import {getDataPokedex, getDataPokemon} from '../../Redux/slices/pokeSlice';
import {moderateScale} from 'react-native-size-matters';
import {backgroundColors, textColor} from '../../Assets/Colors';
import {PokeBall} from '../../Assets/Image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {setLogout} from '../../Redux/slices/userSlice';
import auth from '@react-native-firebase/auth';

export default function PokeDexScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {isLoad, catching} = useSelector(state => state.global);
  const {userInfo} = useSelector(state => state.user);
  const {pokemonData} = useSelector(state => state.pokemon);

  const [numberCatching, setNumberCatching] = useState(1);

  const onNextCatching = useCallback(async () => {
    try {
      dispatch(setLoad(true));
      if (catching === 1) {
        setNumberCatching(1);
      }
      if (pokemonData.next === null) {
        return;
      } else {
        dispatch(getDataPokedex(pokemonData.next));

        if (numberCatching >= 0) {
          setNumberCatching(state => state + 1);
          dispatch(setCatch(numberCatching + 1));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoad(false));
    }
  }, [dispatch, pokemonData.next]);

  const onPrevCatching = useCallback(async () => {
    try {
      dispatch(setLoad(true));
      if (pokemonData.previous === null) {
        return;
      } else {
        dispatch(getDataPokedex(pokemonData.previous));
        if (numberCatching > 0) {
          setNumberCatching(state => state - 1);
          dispatch(setCatch(numberCatching - 1));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoad(false));
    }
  }, [pokemonData.previous, dispatch]);

  useEffect(() => {
    dispatch(getDataPokedex());
  }, [dispatch]);

  const signOut = async () => {
    try {
      await auth()
        .signOut()
        .then(() => {
          navigation.navigate('Login');
          console.log('out');
        });
    } catch (error) {
      console.error(error);
    }
  };

  const renHeader = () => {
    return (
      <View
        style={{
          paddingVertical: moderateScale(10),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginRight: moderateScale(5),
        }}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Logout', 'Apakah anda yakin untuk logout ?', [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {
                text: 'OK',
                onPress: () => {
                  let isOut = true;
                  dispatch(setLogout({}));

                  isOut = false;
                  if (!isOut) {
                    signOut();
                  }
                },
              },
            ])
          }>
          <AntDesign name="logout" size={26} color={textColor.white} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: moderateScale(18),
            }}>
            PokeDex
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('CatchScreen')}
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: moderateScale(18),
            }}>
            PokeBag
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renFooter = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: moderateScale(6),
          marginVertical: moderateScale(24),
        }}>
        <TouchableOpacity
          onPress={() => onPrevCatching()}
          style={{
            paddingVertical: moderateScale(18),
            paddingHorizontal: moderateScale(28),
            borderRadius: moderateScale(10),
            backgroundColor: backgroundColors.ground,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}>
            Sebelumnya
          </Text>
        </TouchableOpacity>
        {catching === 1 ? (
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            {catching}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            {numberCatching}
          </Text>
        )}
        <TouchableOpacity
          onPress={() => onNextCatching()}
          style={{
            paddingVertical: moderateScale(18),
            paddingHorizontal: moderateScale(28),
            borderRadius: moderateScale(10),
            backgroundColor: backgroundColors.ice,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: moderateScale(15),
            }}>
            Selanjutnya
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: backgroundColors.fire}}>
      <View
        style={{
          marginHorizontal: moderateScale(18),
          marginTop: moderateScale(24),
        }}>
        {isLoad ? (
          <ActivityIndicator
            style={{
              color: 'orange',
              width: 200,
              height: 100,
            }}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={pokemonData.results}
            numColumns={2}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  dispatch(getDataPokemon(item.name));
                  navigation.navigate('PokemonScreen');
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  elevation: moderateScale(2),
                  paddingVertical: moderateScale(8),
                  paddingHorizontal: moderateScale(12),
                  marginVertical: moderateScale(12),
                  marginHorizontal: moderateScale(8),
                  width: 160,
                  borderRadius: moderateScale(7),
                }}>
                <Image
                  source={PokeBall}
                  style={{
                    height: 36,
                    width: 36,
                    marginRight: moderateScale(10),
                  }}
                />
                <Text style={{fontStyle: 'italic', color: textColor.black}}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Text>
              </TouchableOpacity>
            )}
            ListHeaderComponent={renHeader}
            ListFooterComponent={renFooter}
          />
        )}
      </View>
    </View>
  );
}
