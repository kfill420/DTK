import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { modal_setIsOpen } from '../../@types/payload';

export const initialState = {
  burgerModalIsOpen: false,
  confirmModalIsOpen: false,
}

const ModalMenu = createSlice({
  name: 'modalMenu',
  initialState,
  reducers: {
    toggleIsOpen: (state, action: PayloadAction<'burgerModalIsOpen' | 'confirmModalIsOpen'>) => {
      state[action.payload] = !state[action.payload];
    },
    setIsOpen: (state, action: PayloadAction<modal_setIsOpen>) => {
      state[action.payload.modal] = action.payload.value;
    },
  }
})

export const { toggleIsOpen, setIsOpen } = ModalMenu.actions;
export default ModalMenu.reducer;
