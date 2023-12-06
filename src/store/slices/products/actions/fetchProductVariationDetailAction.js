import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  requestProductVariationDetail,
  requestGenerateProductVariationId,
  productVariationTransform,
} from "../../../../db/productVariations";
import * as SQLlite from "expo-sqlite";
import { FormState, RequestState } from "../../../../enums";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const fetchProductVariationDetailAction = createAsyncThunk(
  "products/fetchProductVariationDetail",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    if (!payload.id) {
      const request = await requestGenerateProductVariationId(db);
      if (request.state === RequestState.fulfilled) {
        return {
          state: FormState.idle,
          body: {
            productVariationId: request.body,
          },
        };
      } else {
        throw Error(request.message);
      }
    } else {
      const request = await requestProductVariationDetail(false, {
        id: payload.id,
      });
      if (request.state === RequestState.fulfilled) {
        const productVariationDetail = {
          state: FormState.idle,
          ...request.body,
        };
        return { state: FormState.idle, body: productVariationDetail };
      } else {
        throw Error(request.message);
      }
    }
  }
);

export const fetchProductVariationDetailBuilder = (builder) => {
  builder
    .addCase(fetchProductVariationDetailAction.pending, (state) => {})
    .addCase(
      fetchProductVariationDetailAction.fulfilled,
      (state, { payload }) => {
        if (!payload.body?.id) {
          state.productVariationForm = {
            ...payload,
            body: {
              ...payload.body,
              productVariationName: "",
              productVariationDescription: "",
            },
          };
        } else {
          state.productVariationForm = {
            ...payload,
            body: {
              ...productVariationTransform(payload?.body),
              productVariationParent: productVariationTransform(
                payload?.body?.productVariationParent
              ),
            },
          };
        }
      }
    )
    .addCase(fetchProductVariationDetailAction.rejected, (state, action) => {
      console.log(action.error.message);
    });
};
