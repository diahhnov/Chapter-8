import React, {useState} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import {useEffect} from 'react';
import {getDataPokemon} from '../../Redux/slices/pokeSlice';
import {BackIcon, PokeBall} from '../../Assets/Image';
import styles from './styles';

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
    <View style={styles.container}>
      <View style={styles.containFlatlist}>
        <FlatList
          numColumns={2}
          ListHeaderComponent={() => (
            <View style={styles.containHeader}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={BackIcon} style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.textPokeBag}>PokeBag</Text>
              <Text style={styles.lengthCatch}>{pokemonList.length}</Text>
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
              style={styles.cardPokemon}>
              <Image source={PokeBall} style={styles.pokeBall} />
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
