import { createSlice } from '@reduxjs/toolkit';

// action types
// export const ADD_TO_CART = 'ADD_TO_CART';
// export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
// export const SET_QUANTITY = 'SET_QUANTITY';
// export const NOTIFY = 'NOTIFY';
// export const ENQUEUE_NOTIFICATION = 'ENQUEUE_NOTIFICATION';
// export const DEQUEUE_NOTIFICATION = 'DEQUEUE_NOTIFICATION';

const initialState = [
  {
    itemId: 'KzVInmjADywcsWUGvklF',
    quantity: 1,
    lastAddedAt: Date.now(),
  },
  {
    itemId: 'liHck1vuFVu5Yipyo9wS',
    quantity: 2,
    lastAddedAt: Date.now(),
  },
];

const cartSlice = createSlice({
  name: 'myCart',
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const { id } = action.payload;

      if (state.filter((item) => item.itemId === id).length) {
        // 아미 장바구니에 있으면
        const idx = state.map((item) => item.itemId).indexOf(id); // 장바구니 내 인덱스
        state[idx].quantity++;
        state[idx].lastAddedAt = Date.now;
      } else {
        // 아직 없으면
        state = [{ itemId: id, quantity: 1, lastAddedAt: Date.now }, ...state];
      }
      return state;
    },
    REMOVE_FROM_CART: (state, action) => {
      const { id } = action.payload;
      state = state.filter((item) => item.itemId !== id);
      return state;
    },
    SET_QUANTITY: (state, action) => {
      const { id, quantity } = action.payload;
      state = state.map((item) =>
        item.itemId === id ? (item.quantity = quantity) : item
      );
    },
  },
});

export default cartSlice;
export const { ADD_TO_CART, REMOVE_FROM_CART, SET_QUANTITY } =
  cartSlice.actions;
