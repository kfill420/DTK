import { createSlice } from '@reduxjs/toolkit';
import actionCheckProduct from '../thunks/checkProduct';
import { ProductStateI } from '../../@types/product';

export const initialState: ProductStateI = {
  list: [],
};

const productSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(actionCheckProduct.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  }
})

// export const { } = productSlice.actions;
export default productSlice.reducer;
