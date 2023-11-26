import { createSlice } from "@reduxjs/toolkit";
import * as yup from "yup";
import FormSate from "../../../enums/FormState";

import {
  fetchProductAction,
  fetchProductActionBuilder,
  fetchProductDetailAction,
  fetchProductDetailBuilder,
  insertProductAction,
  insertProductBuilder,
  generateProjectIdAction,
  generateProjectIdBuilder,
  updateProductAction,
  updateProductBuilder,
} from "./actions";

export const productFormSchema = yup.object().shape({
  productId: yup
    .string()
    .required("Id is required")
    .min(4, "Product id must contain at least 4 characters"),
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
  formActionState: FormSate.fresh,
  productDetail: {
    productId: "0",
    productName: "",
    productDescription: "",
    productBarcode: "",
    productSku: "",
    productPrice: 0,
    productshortkeyColor: "",
    productCode: "",
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
      state.formActionState = FormSate.fresh;
      state.productDetail = {
        id: 0,
        productId: "",
        productName: "",
        productDescription: "",
        productBarcode: "",
        productSku: "",
        productPrice: 0,
        productshortkeyColor: "",
        productCode: "",
      };
    },
    updateFormAction: (state, payload) => {
      state.formActionState = payload?.payload?.formState || FormSate.fresh;
      state.productDetail =
        payload?.payload?.productDetail || state.productDetail;
    },
  },
  extraReducers: (builder) => {
    fetchProductActionBuilder(builder);
    fetchProductDetailBuilder(builder);
    insertProductBuilder(builder);
    generateProjectIdBuilder(builder);
    updateProductBuilder(builder);
  },
});

// Action creators are generated for each case reducer function
export const { restartFormAction, updateFormAction } = productSlice.actions;
export {
  fetchProductAction,
  insertProductAction,
  fetchProductDetailAction,
  generateProjectIdAction,
  updateProductAction,
};
export default productSlice.reducer;
