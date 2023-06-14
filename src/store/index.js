import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slice/cartSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

const reducers = combineReducers({
  cartReducer: cartSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage, 
  whitelist: ['cartReducer'], 
};

const myPersistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: myPersistedReducer,
  middleware: (
    getDefaultMiddleware 
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
