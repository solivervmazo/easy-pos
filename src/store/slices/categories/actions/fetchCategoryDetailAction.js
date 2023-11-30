import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  selectProductsQuery,
  insertProductQuery,
} from "../../../../db/products";
import * as SQLlite from "expo-sqlite";
import { generateProductId } from "../../../helpers/generateProductId";
import { FormState } from "../../../../enums";

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
      const { query, args } = selectProductsQuery({
        args: { id: payload.id },
        limit: 1,
      });
      let rows = [];
      await db.transactionAsync(async (tx) => {
        rows = await tx.executeSqlAsync(query, args);
      });
      return { state: FormState.idle, body: rows?.rows[0] };
    }
  }
);

export const fetchProductDetailBuilder = (builder) => {
  builder
    .addCase(fetchProductDetailAction.pending, (state) => {
      // return {
      //   ...state,
      //   formLoading: true,
      // };
    })
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
      // return {
      //   ...state,
      //   formLoading: false,
      //   productDetail: {
      //     ...state.prductDetail,
      //     id: action.payload?.id,
      //     productId: action.payload?.product_id,
      //     productName: action.payload?.product_name,
      //     productDescription: action.payload?.product_description,
      //     productBarcode: action.payload?.product_barcode,
      //     productSku: action.payload?.product_sku,
      //     productPrice: action.payload?.product_price,
      //     productCode: action.payload?.product_code,
      //     productShortkeyColor: action.payload?.product_shortkey_color,
      //   },
      // };
    })
    .addCase(fetchProductDetailAction.rejected, (state, action) => {
      console.log(action.error.message);
      // return {
      //   ...state,
      //   formLoading: false,
      //   error: action.error.message,
      // };
    });
};
