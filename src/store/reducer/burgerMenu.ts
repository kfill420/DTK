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
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  }
})

export const { toggleIsOpen, setIsOpen } = burgerMenu.actions;
export default burgerMenu.reducer;
