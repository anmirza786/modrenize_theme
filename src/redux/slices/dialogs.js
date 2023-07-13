import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  data: null,
};

const Dialog = createSlice({
  name: 'dialogSlice',
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setIsOpen, setData } = Dialog.actions;

export default Dialog.reducer;
