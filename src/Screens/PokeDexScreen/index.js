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
import {textColor} from '../../Assets/Colors';
import {PokeBall} from '../../Assets/Image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {setLogout} from '../../Redux/slices/userSlice';
import auth from '@react-native-firebase/auth';
import styles from './styles';

export default function PokeDexScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {isLoad, catching} = useSelector(state => state.global);
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
      <View style={styles.containerHeader}>
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
          <Text style={styles.textPokeDex}>PokeDex</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('CatchScreen')}
          style={styles.toPokeBag}>
          <Text style={styles.textPokeBag}>PokeBag</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renFooter = () => {
    return (
      <View style={styles.containerFooter}>
        <TouchableOpacity
          onPress={() => onPrevCatching()}
          style={styles.toSebelum}>
          <Text style={styles.textSebelum}>Sebelumnya</Text>
        </TouchableOpacity>
        {catching === 1 ? (
          <Text style={styles.number}>{catching}</Text>
        ) : (
          <Text style={styles.number}>{numberCatching}</Text>
        )}
        <TouchableOpacity
          onPress={() => onNextCatching()}
          style={styles.toSesudah}>
          <Text style={styles.textSesudah}>Selanjutnya</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.containerScreen}>
      <View style={styles.screen}>
        {isLoad ? (
          <ActivityIndicator style={styles.actIndicator} />
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
                style={styles.cardPokemon}>
                <Image source={PokeBall} style={styles.pokeBall} />
                <Text style={styles.namePokemon}>
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
