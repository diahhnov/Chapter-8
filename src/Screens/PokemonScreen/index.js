import {
  View,
  Text,
  Animated,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  Easing,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setCatch, setLoad} from '../../Redux/slices/globalSlice';
import {moderateScale} from 'react-native-size-matters';
import {getDataPokedex} from '../../Redux/slices/pokeSlice';
import database from '@react-native-firebase/database';
import {BackIcon} from '../../Assets/Image';
import styles from './styles';

const PokemonScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [catching, setCatching] = useState(false);

  const leftValue = useState(new Animated.Value(0))[0];
  const upValue = useState(new Animated.Value(0))[0];

  const {isLoad} = useSelector(state => state.global);
  const {pokemonData} = useSelector(state => state.pokemon);

  const onPokemonCaptured = () => {
    const reference = database().ref(`/pokebag/${pokemonData.id}`);
    const content = {
      name: pokemonData.name,
      status: true,
    };

    try {
      reference.set(content);
    } catch (error) {
      console.log(error);
    }
  };

  const checkPokemon = useCallback(async () => {
    try {
      dispatch(setLoad(true));
      database()
        .ref('/pokebag')
        .once('value')
        .then(snapshot => {
          let pokemonList = Object.values(snapshot.val());
          pokemonList.forEach(e => {
            if (pokemonData.name === e.name) {
              setCatching(e.status);
            }
          });
        });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoad(false));
    }
  }, [dispatch, pokemonData.name]);

  const onCatch = async () => {
    const generateRandom = Math.random() * 1000;
    const generateNumber = Math.round(generateRandom);

    if (generateNumber > 500 && generateNumber % 2 === 0) {
      setCatching(true);
      onPokemonCaptured();

      Animated.loop(
        Animated.sequence([
          Animated.timing(upValue, {
            toValue: 10,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.linear(),
          }),
          Animated.timing(upValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.linear(),
          }),
        ]).start(),
      );

      Alert.alert(
        'wow you are cool!',
        `You just catched ${
          pokemonData?.name?.charAt(0).toUpperCase() +
          pokemonData?.name?.slice(1)
        }.`,
        [
          {
            text: 'Go to PokeBag',
            onPress: () => navigation.navigate('CatchScreen'),
          },
          {text: 'OK'},
        ],
      );
    } else {
      setCatching(false);

      Animated.loop(
        Animated.sequence([
          Animated.timing(leftValue, {
            toValue: -10,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.linear(),
          }),
          Animated.timing(leftValue, {
            toValue: 10,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.linear(),
          }),
          Animated.timing(leftValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.linear(),
          }),
        ]).start(),
      );

      Alert.alert('Come On!!', 'Do you give up?', [
        {
          text: 'yup!',
        },
        {text: 'BIG NO', onPress: () => onCatch()},
      ]);
    }
  };

  useEffect(() => {
    checkPokemon();
  }, [checkPokemon]);

  return (
    <View style={styles.containerScreen}>
      {isLoad ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <View style={styles.containerHeader}>
              <View style={styles.backgroundHeader}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(getDataPokedex());
                    dispatch(setCatch(1));
                    navigation.navigate('PokeDexScreen');
                  }}>
                  <Image source={BackIcon} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.textPokemonDetail}>Pokemon Detail</Text>
                {catching ? (
                  <View
                    style={{
                      padding: moderateScale(6),
                      borderRadius: moderateScale(10),
                    }}>
                    <Text style={styles.textCatch}>Catched</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={{
                      padding: moderateScale(6),
                      borderRadius: moderateScale(10),
                    }}
                    onPress={() => onCatch()}>
                    <Text style={styles.catchMe}>Catch Me!</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Animated.View
                style={{marginTop: upValue, marginLeft: leftValue}}>
                <View style={styles.containerImagePokemon}>
                  <Image
                    source={{
                      uri: pokemonData?.sprites?.other['official-artwork']
                        .front_default,
                    }}
                    style={styles.imagePokemon}
                  />
                </View>
              </Animated.View>
              <View style={{flexDirection: 'column'}}>
                <View style={styles.containerNamePokemon}>
                  <Text style={styles.namePokemon}>
                    {pokemonData?.name?.charAt(0).toUpperCase() +
                      pokemonData?.name?.slice(1)}
                  </Text>
                  <View style={styles.containerInformation}>
                    <Text style={styles.text}>Information:</Text>
                    <Text>Height : {pokemonData.height}</Text>
                    <Text>Weight : {pokemonData.weight}</Text>
                    <Text>Species : {pokemonData?.species?.name}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.containerTypes}>
                <Text style={styles.text}>Types :</Text>
                <FlatList
                  horizontal={true}
                  data={pokemonData.types}
                  keyExtractor={(item, index) => index}
                  renderItem={({item}) => (
                    <Text style={styles.types}>{item.type.name}</Text>
                  )}
                />
              </View>
              <View style={styles.containerAbl}>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  Abilities :
                </Text>
                <FlatList
                  horizontal={true}
                  data={pokemonData.abilities}
                  keyExtractor={(item, index) => index}
                  renderItem={({item}) => (
                    <Text style={styles.types}>{item.ability.name}</Text>
                  )}
                />
              </View>

              <Text style={styles.moves}>Moves : </Text>
            </View>
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={pokemonData.moves}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}) => (
            <Text style={styles.manyMoves}>{item.move.name}</Text>
          )}
        />
      )}
    </View>
  );
};

export default PokemonScreen;
