import {applyMiddleware, combineReducers, createStore} from 'redux';
// import {configureStore} from '@reduxjs/toolkit';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
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

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   timeout: null,
//   whitelist: ['user'],
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

const allMiddlewares = applyMiddleware(logger, thunk);

export const store = createStore(reducers, {}, allMiddlewares);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);
