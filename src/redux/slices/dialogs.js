import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  imageDialog: false,
};

const Dialog = createSlice({
  name: 'dialogSlice',
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setImageDialog: (state, action) => {
      state.imageDialog = action.payload;
    },
  },
});

export const { setIsOpen, setImageDialog } = Dialog.actions;

export default Dialog.reducer;
