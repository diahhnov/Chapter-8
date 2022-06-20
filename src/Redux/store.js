import {applyMiddleware, combineReducers, createStore} from 'redux';

import globalSlice from './slices/globalSlice';
import pokeSlice from './slices/pokeSlice';
import userSlice from './slices/userSlice';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  pokemon: pokeSlice,
  user: userSlice,
  global: globalSlice,
});

const allMiddlewares = applyMiddleware(logger, thunk);

export const store = createStore(reducers, {}, allMiddlewares);
