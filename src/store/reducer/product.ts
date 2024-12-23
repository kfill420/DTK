import { createSlice } from '@reduxjs/toolkit';
import actionCheckProduct from '../thunks/checkProduct';
import { ProductStateI } from '../../@types/product';

export const initialState: ProductStateI = {
  list: [],
  stateProduct: ["Imparfait", "Correct", "Très bon", "Parfait"],
  stockageProduct: ["64Go", "128Go", "256Go", "512Go", "1To"],
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

// export const {  } = productSlice.actions;
export default productSlice.reducer;
