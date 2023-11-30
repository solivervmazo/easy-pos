import { createSlice } from "@reduxjs/toolkit";
import * as yup from "yup";
import {
  FormState,
  LoadState,
  RequestState,
  SpinnerState,
} from "../../../enums/";

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
  productListState: RequestState.idle, //
  loading: true, //
  formLoading: false, //
  formActionState: FormState.fresh, //
  screenSpinner: SpinnerState.show,
  productForm: undefined,
  productTable: {
    state: RequestState.idle,
    data: undefined,
  },
  productDetail: {
    //
    productId: "0",
    productName: "",
    productDescription: "",
    productBarcode: "",
    productSku: "",
    productPrice: 0,
    productShortkeyColor: "",
    productCode: "",
  },
  productList: [], //
  error: null, //
  response: null, //
  refreshProductList: LoadState.init, //
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    restartFormAction: (state) => {
      return {
        ...state,
        formActionState: FormState.fresh,
        productForm: undefined,
        productDetail: {
          id: 0,
          productId: "",
          productName: "",
          productDescription: "",
          productBarcode: "",
          productSku: "",
          productPrice: 0,
          productShortkeyColor: "",
          productCode: "",
        },
      };
    },
    updateProductFormAction: (state, { payload }) => {
      state.productForm.state = payload.state || FormState.editing;
      if (payload.body) state.productForm.body = payload.body;
    },
    refreshProductListAction: (state, payload) => {
      return {
        ...state,
        refreshProductList: payload.payload,
      };
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
export const {
  restartFormAction,
  updateProductFormAction,
  refreshProductListAction,
} = productSlice.actions;
export {
  fetchProductAction,
  insertProductAction,
  fetchProductDetailAction,
  generateProjectIdAction,
  updateProductAction,
};
export const productTableSelector = (state) => state.products.productTable;

export default productSlice.reducer;
