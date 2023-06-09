import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  books: [
    {
      id: nanoid(),
      title: '식물적 낙관',
      author: '김금희',
      publisher: '문학동네',
      img: '/books/식물적 낙관.jpeg',
      price: 15000,
    },
    {
      id: nanoid(),
      title: '얼굴 없는 중개자들',
      author: '하비에르 블라스',
      publisher: '알키',
      img: '/books/얼굴 없는 중개자들.jpeg',
      price: 22500,
    },
    {
      id: nanoid(),
      title: '선생님, 탄소 중립을 이루려면 어떻게 해야 해요?',
      author: '최원형',
      publisher: '철수와 영희',
      img: '/books/탄소 중립을 이루려면.jpeg',
      price: 11700,
    },
    {
      id: nanoid(),
      title: '사계절 기억책',
      author: '최원형',
      publisher: '블랙피쉬',
      img: '/books/사계절 기억책.jpeg',
      price: 15700,
    },

    {
      id: nanoid(),
      title: '하늘과 바람과 별과 인간',
      author: '김상욱',
      publisher: '바다출판사',
      img: '/books/하늘과 바람과 별과 인간.jpeg',
      price: 16000,
    },
    {
      id: nanoid(),
      title: '인공지능과 소설가의 일',
      author: '김연수',
      publisher: '이음',
      img: '/books/인공지능과 소설가의 일.jpeg',
      price: 13500,
    },
  ],
  notification: [],
};

const bookSlice = createSlice({
  name: 'books',
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

export default bookSlice;
export const { up, down } = bookSlice.actions;
