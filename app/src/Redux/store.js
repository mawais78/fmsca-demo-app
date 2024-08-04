import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};

const reducers = combineReducers({
  user: userReducer

});

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export const persistor = persistStore(store);
