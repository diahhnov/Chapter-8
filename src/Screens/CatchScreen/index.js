import React, {useState} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import {useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {getDataPokemon} from '../../Redux/slices/pokeSlice';
import {backgroundColors, textColor} from '../../Assets/Colors';
import {BackIcon, PokeBall} from '../../Assets/Image';

export default function CatchScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [pokemonList, setPokemonList] = useState([]);

  const onGetPokebag = () => {
    database()
      .ref('/pokebag')
      .once('value')
      .then(snapshot => {
        setPokemonList(Object.values(snapshot.val()));
      });
  };

  useEffect(() => {
    onGetPokebag();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColors.fire,
      }}>
      <View
        style={{
          marginHorizontal: moderateScale(18),
          marginTop: moderateScale(24),
        }}>
        <FlatList
          numColumns={2}
          ListHeaderComponent={() => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={BackIcon}
                  style={{
                    tintColor: textColor.white,
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: moderateScale(20),
                  fontWeight: 'bold',
                  color: textColor.white,
                }}>
                PokeBag
              </Text>
              <Text
                style={{
                  paddingHorizontal: moderateScale(6),
                  paddingVertical: moderateScale(8),
                  borderRadius: moderateScale(20),
                  fontSize: moderateScale(16),
                  fontWeight: 'bold',
                  color: textColor.white,
                }}>
                {pokemonList.length}
              </Text>
            </View>
          )}
          data={pokemonList}
          showsVerticalScrollIndicator={false}
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
                width: 160,
                borderRadius: moderateScale(10),
                elevation: moderateScale(2),
                paddingVertical: moderateScale(8),
                marginHorizontal: moderateScale(8),
                paddingHorizontal: moderateScale(12),
                backgroundColor: textColor.white,
                marginTop: moderateScale(20),
              }}>
              <Image
                source={PokeBall}
                style={{
                  height: 36,
                  width: 36,
                  marginRight: moderateScale(10),
                }}
              />
              <Text>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
