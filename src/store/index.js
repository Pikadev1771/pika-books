import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slice/cartSlice';
import bookSlice from './slice/bookSlice';

const store = configureStore({
  reducer: {
    cartReducer: cartSlice.reducer,
    bookReducer: bookSlice.reducer,
  },
});

export default store;
