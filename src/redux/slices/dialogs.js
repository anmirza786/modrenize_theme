import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const Dialog = createSlice({
  name: "dialogSlice",
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    }
  },
});

export const { setIsOpen } =
Dialog.actions;

export default Dialog.reducer;
