import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    itemId: 'KzVInmjADywcsWUGvklF',
    quantity: 1,
    checked: true,
  },
  {
    itemId: 'liHck1vuFVu5Yipyo9wS',
    quantity: 2,
    checked: true,
  },
];

const cartSlice = createSlice({
  name: 'myCart',
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const { id } = action.payload;

      if (state.filter((item) => item.itemId === id).length) {
        // 이미 장바구니에 있으면
        const idx = state.map((item) => item.itemId).indexOf(id); // 장바구니 내 인덱스
        state[idx].quantity++;
      } else {
        // 아직 없으면
        state = [{ itemId: id, quantity: 1, checked: true }, ...state];
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
