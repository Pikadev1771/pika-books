import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [
    {
      id: 1,
      quantity: 1,
    },
  ],
  notification: [],
};

const cartSlice = createSlice({
  name: 'myCart',
  initialState,
  reducers: {
    up: (state, action) => {
      state.value = state.value + action.payload;
    },
    down: (state, action) => {
      state.value = state.value - action.payload;
    },
  },
});

export default cartSlice;
export const { up, down } = cartSlice.actions;
