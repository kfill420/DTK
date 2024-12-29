import accountSlice from './account';
import modalMenuSlice from './modal';
import productSlice from './product';

const reducer = {
  account: accountSlice,
  ModalMenu: modalMenuSlice,
  product: productSlice,
};

export default reducer;