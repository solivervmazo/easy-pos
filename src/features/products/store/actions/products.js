import { createAsyncThunk } from "@reduxjs/toolkit";
import * as SQLlite from "expo-sqlite";
import { FormState, RequestState, SpinnerState } from "../../../../enums";
import { dbProductCategories, dbProducts } from "../../db/";
import {
  requestProductList,
  requestProductDetail,
  requestProductNewId,
} from "../../context/products";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

const fetchTable = createAsyncThunk(
  "products/fetchProductAction",
  async (payload = {}) => {
    const db = SQLlite.openDatabase(db_name);
    const { orderBy = "id", desc = true } = payload;
    const productList = await requestProductList(db, {
      db,
      orderBy,
      desc,
    });
    const tableRows = productList?.body || [];
    return tableRows;
  }
);
const fetchDetail = createAsyncThunk(
  "products/fetchProductDetail",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    if (!payload.id) {
      const productId = await requestProductNewId(db);
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
const insert = createAsyncThunk("products/insertProduct", async (payload) => {
  const db = SQLlite.openDatabase(db_name);
  const { query, args } = dbProducts.insertQuery(payload);
  let response = null;
  await db.transactionAsync(async (tx) => {
    const result = await tx.executeSqlAsync(query, args);

    const { query: selectQuery, args: selectArgs } = dbProducts.selectQuery({
      args: {
        id: result.insertId,
      },
    });
    const inserted = await tx.executeSqlAsync(selectQuery, selectArgs);
    response = inserted?.rows[0];
  });
  return response;
});

const update = createAsyncThunk(
  "products/updateProductAction",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    if (!payload.id) return null;
    const { query, args } = dbProducts.updateQuery(payload);
    let response = null;
    await db.transactionAsync(async (tx) => {
      await tx.executeSqlAsync(query, args);

      const { query: selectQuery, args: selectArgs } = dbProducts.selectQuery({
        args: {
          id: payload.id,
        },
      });
      const inserted = await tx.executeSqlAsync(selectQuery, selectArgs);
      response = inserted?.rows[0];
    });
    return response;
  }
);

const generateId = createAsyncThunk(
  "products/generateProjectIdAction",
  async (payload = { random: true }) => {
    const { random } = payload;
    const db = SQLlite.openDatabase(db_name);
    const productId = await requestProductNewId(db, false, { random });
    return productId;
  }
);

class ProductCreators {
  static state = {
    screenProductSpinner: SpinnerState.show,
    productForm: undefined,
    productTable: {
      state: RequestState.idle,
      data: undefined,
    },
  };

  static actions = {
    restartForm: (state) => {
      return {
        ...state,
        productForm: undefined,
      };
    },
    updateForm: (state, { payload }) => {
      state.productForm.state = payload.state || FormState.editing;
      if (payload.body) state.productForm.body = payload.body;
    },
  };

  static creators = {
    fetchTable,
    fetchDetail,
    insert,
    update,
    generateId,
  };

  static builder = (builder) => {
    const createBuilder = (
      builder,
      action,
      fulfilled = (state, action) => {},
      { pending, rejected } = { pending: undefined, rejected: undefined }
    ) => {
      return builder
        .addCase(action.pending, (state, action) => {
          if (pending && typeof pending == "function") {
            const newState = pending(state, action);
            if (typeof newState === "object") return newState;
          }
        })
        .addCase(action.fulfilled, (state, action) => {
          if (fulfilled && typeof fulfilled == "function") {
            const newState = fulfilled(state, action);
            if (typeof newState === "object") return newState;
          }
        })
        .addCase(action.rejected, (state, action) => {
          console.log(action.error.message);
          if (rejected && typeof rejected == "function") {
            const newState = rejected(state, action);
            if (typeof newState === "object") return newState;
          }
        });
    };
    createBuilder(
      builder,
      fetchTable,
      (state, action) => {
        return {
          ...state,
          productTable: {
            state: RequestState.fulfilled,
            data: action.payload?.map((product) => ({
              ...dbProducts.transform(product),
              productCategory: dbProductCategories.transform(
                product.product_category
              ),
            })),
          },
          screenProductSpinner: SpinnerState.hidden,
        };
      },
      {
        pending: (state) => (state.screenProductSpinner = SpinnerState.show),
        rejected: (state) => (state.screenProductSpinner = SpinnerState.hidden),
      }
    );

    createBuilder(builder, fetchDetail, (state, { payload }) => {
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
    });

    createBuilder(
      builder,
      insert,
      (state, action) => {
        const productList = Object.assign([], state.productTable?.data || []);
        productList.unshift({
          ...dbProducts.transform(action.payload),
          categoryParent: dbProductCategories.transform(
            action.payload.category_parent
          ),
        });
        return {
          ...state,
          productForm: {
            state: FormState.sumbmitted,
            body: undefined,
          },
          productTable: {
            ...state.productTable,
            data: productList,
          },
        };
      },
      {
        pending: (state) => (state.productForm.state = FormState.pending),
        rejected: (state) => (state.productForm.state = FormState.editing),
      }
    );

    createBuilder(
      builder,
      update,
      (state, action) => {
        return {
          ...state,
          productForm: {
            state: FormState.sumbmitted,
            body: undefined,
          },
          productTable: {
            ...state.productTable,
            data: Object.assign([], state.productTable.data).map((product) => {
              if (product.id === action.payload.id) {
                return {
                  id: action.payload.id,
                  productId: action.payload.product_id,
                  productName: action.payload.product_name,
                  productDescription: action.payload.product_description,
                  productBarcode: action.payload.product_barcode,
                  productSku: action.payload.product_sku,
                  productCategory: action.payload.category_id,
                  productCode: action.payload.product_code,
                  productPrice: action.payload.product_price,
                  productShortkeyColor: action.payload.product_shortkey_color,
                };
              } else {
                return product;
              }
            }),
          },
        };
      },
      {
        pending: (state) => (state.productForm.state = FormState.pending),
        rejected: (state) => (state.productForm.state = FormState.editing),
      }
    );

    createBuilder(
      builder,
      generateId,
      (state, action) => {
        return {
          ...state,
          productForm: {
            state: FormState.editing,
            body: {
              ...state.productForm?.body,
              productId: action.payload,
            },
          },
        };
      },
      {
        pending: (state) => (state.productForm.state = FormState.pending),
        rejected: (state) => (state.productForm.state = FormState.editing),
      }
    );
  };
}

export const productCreators = ProductCreators;
