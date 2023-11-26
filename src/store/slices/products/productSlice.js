import { createSlice } from "@reduxjs/toolkit";
import * as yup from "yup";

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
  static editing = "EDITING";
  static view = "VIEW";
  static update = "UPDATE";
}

export const productFormSchema = yup.object().shape({
  productId: yup.string().required("Id is required"),
  productName: yup
    .string()
    .required("Product name is required")
    .min(3, "Product name must contain at least 3 characters"),
  productDescription: yup.string(),
  productBarcode: yup.string(),
  productSku: yup.string(),
});

const initialState = {
  loading: true,
  formLoading: false,
  formSubmitted: 0,
  productDetail: {
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
    restartFormAction: (state) => {
      state.formSubmitted = 0;
      state.productDetail = {
        productId: "0",
        productName: "",
        productDescription: "",
        productBarcode: "",
        productSku: "",
      };
    },
    updateFormAction: (state, payload) => {
      console.log("payload", payload);
      state.productDetail = payload?.payload || state.productDetail;
    },
  },
  extraReducers: (builder) => {
    fetchProductActionBuilder(builder);
    fetchProductDetailBuilder(builder);
    insertProductBuilder(builder);
  },
});

// Action creators are generated for each case reducer function
export const { restartFormAction, updateFormAction } = productSlice.actions;
export { fetchProductAction, insertProductAction, fetchProductDetailAction };
export default productSlice.reducer;
