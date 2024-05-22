import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProductList(state, action) {
      state.productList = action.payload;
    },
  },
});

export default productSlice.reducer;

export const { updateProductList } = productSlice.actions;
