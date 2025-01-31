import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../lib/types/screen";

const initialState: ProductsPageState = {
  moto: null,
  chosenProduct: null,
  products: [],
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setMoto: (state, action) => {
      state.moto = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  setMoto,
  setChosenProduct,
  setProducts,
} = productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;
