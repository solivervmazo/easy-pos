import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProductAction,
  fetchProductActionBuilder,
  fetchProductDetailAction,
  fetchProductDetailBuilder,
  insertProductAction,
  insertProductBuilder,
} from "./actions";

export class FormSate {
  static fresh = "FRESH";
  static view = "VIEW";
  static update = "UPDATE";
}

const initialState = {
  loading: true,
  formLoading: false,
  formState: FormSate.fresh,
  formSubmitted: 0,
  form: {
    productId: "0",
    productName: "",
    productDescription: "",
    productBarcode: "",
    productSku: "",
  },
  productList: [],
  error: null,
  response: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    restartForm: (state) => {
      state.formSubmitted = 0;
    },
  },
  extraReducers: (builder) => {
    fetchProductActionBuilder(builder);
    fetchProductDetailBuilder(builder);
    insertProductBuilder(builder);
  },
});

// Action creators are generated for each case reducer function
export const { restartForm } = productSlice.actions;
export { fetchProductAction, insertProductAction, fetchProductDetailAction };
export default productSlice.reducer;
