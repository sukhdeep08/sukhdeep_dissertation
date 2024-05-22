import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import filterReducer from "./features/Filter/filterSlice";
import cartReducer from "./features/cart/cartSlice";
import userSlice from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    filter: filterReducer,
    cart: cartReducer,
    user: userSlice,
  },
});

export default store;
