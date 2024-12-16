import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isOpen: false,
}

const burgerMenu = createSlice({
  name: 'burgerMenu',
  initialState,
  reducers: {
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  }
})

export const { toggleIsOpen } = burgerMenu.actions;
export default burgerMenu.reducer;
