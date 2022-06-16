import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {setLoad} from './globalSlice';

export const getDataPokedex = createAsyncThunk(
  'pokemon/pokedex',
  async (item, {dispatch, rejectWithValue}) => {
    try {
      dispatch(setLoad(true));
      if (item) {
        const response = await axios.get(item);
        return response.data;
      } else {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20',
        );
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoad(false));
    }
  },
);

export const getDataPokemon = createAsyncThunk(
  'pokemon/pokemonDetail',
  async (pokeName, {rejectWithValue, dispatch}) => {
    try {
      dispatch(setLoad(true));
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokeName}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoad(false));
    }
  },
);

const initialState = {
  pokemonData: {},
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  extraReducers: {
    [getDataPokedex.fulfilled]: (state, action) => {
      return {
        ...state,
        pokemonData: action.payload,
      };
    },
    [getDataPokemon.fulfilled]: (state, action) => {
      return {
        ...state,
        pokemonData: action.payload,
      };
    },
  },
});

export default pokemonSlice.reducer;
