import accountSlice from './account';
import burgerMenuSlice from './burgerMenu';
import productSlice from './product';

const reducer = {
  account: accountSlice,
  burgerMenu: burgerMenuSlice,
  product: productSlice,
};

export default reducer;