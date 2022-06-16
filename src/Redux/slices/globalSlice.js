import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  catching: 1,
  isLoad: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoad(state, action) {
      state.isLoad = action.payload;
    },
    setCatch(state, action) {
      state.catching = action.payload;
    },
  },
});

export const {setLoad, setCatch} = globalSlice.actions;
export default globalSlice.reducer;
