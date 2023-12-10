import { createAsyncThunk } from "@reduxjs/toolkit";
import * as SQLlite from "expo-sqlite";
import { generateProductId } from "../../../helpers/generateProductId";
import { FormState, RequestState } from "../../../../enums";
import { requestProductDetail } from "../../../../context/products/products";
const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const fetchProductDetailAction = createAsyncThunk(
  "products/fetchProductDetail",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    if (!payload.id) {
      const productId = await generateProductId(db);
      return {
        state: FormState.idle,
        body: {
          productId: productId,
        },
      };
    } else {
      const makeRequestProductDetail = await requestProductDetail(
        db,
        payload.id
      );
      if (makeRequestProductDetail.state === RequestState.fulfilled) {
        return { state: FormState.idle, body: makeRequestProductDetail.body };
      } else {
        throw Error(makeRequestProductDetail.message);
      }
    }
  }
);

export const fetchProductDetailBuilder = (builder) => {
  builder
    .addCase(fetchProductDetailAction.pending, (state) => {})
    .addCase(fetchProductDetailAction.fulfilled, (state, { payload }) => {
      if (!payload.body?.id) {
        state.productForm = {
          ...payload,
          body: {
            ...payload.body,
            productName: "",
            productDescription: "",
            productBarcode: "",
            productSku: "",
            productPrice: 0,
            productShortkeyColor: "",
            productCode: "",
          },
        };
      } else {
        state.productForm = {
          ...payload,
          body: {
            id: payload?.body?.id,
            productId: payload?.body?.product_id,
            productName: payload?.body?.product_name,
            productDescription: payload?.body?.product_description,
            productBarcode: payload?.body?.product_barcode,
            productSku: payload?.body?.product_sku,
            categoryId: payload?.body?.category_id,
            productCode: payload?.body?.product_code,
            productPrice: payload?.body?.product_price,
            productShortkeyColor: payload?.body?.product_shortkey_color,
          },
        };
      }
    })
    .addCase(fetchProductDetailAction.rejected, (state, action) => {
      console.log(action.error.message);
    });
};
