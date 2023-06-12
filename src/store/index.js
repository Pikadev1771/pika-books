import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slice/cartSlice';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

const reducers = combineReducers({
  // 각 리듀서들을 하나로 합쳐준다
  cartReducer: cartSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage, // 로컬 스토리지에 저장
  whitelist: ['cartReducer'], // 유지하고 싶은 항목
};

const myPersistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: myPersistedReducer,
  middleware: (
    getDefaultMiddleware // 5) getDefaultMiddleware 미들웨어 사용
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
