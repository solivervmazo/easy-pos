import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { RequestState } from "../../../context-manager";
import { FormState, SpinnerState } from "../../../enums";
import {
  CreatorState,
  IStateCreators,
  StateCreatorsBuilder,
  StateFormProps,
} from "../../../my-app";
import { dbProducts, dbProductCategories } from "../context/db";
import {
  fetchTable,
  fetchForm,
  insert,
  update,
  generateId,
} from "./actions/products";
import {
  ProductScreenState,
  ProductSqlRawProps,
  ProductTransformedProps,
} from "../types";

type ScreenState = ProductScreenState;

class ProductCreators
  extends StateCreatorsBuilder<ScreenState>
  implements IStateCreators<ScreenState>
{
  constructor() {
    super();
  }

  state = {
    screenProductSpinner: SpinnerState.show,
    productForm: undefined,
    productTable: {
      state: RequestState.idle,
      data: undefined,
    },
  };

  actions = {
    restartForm: (state) => {
      return {
        ...state,
        productForm: undefined,
      };
    },
    updateForm: (
      state,
      args: { payload: ProductScreenState["productForm"] }
    ) => {
      const { payload } = args;
      state.productForm.state = payload.state || FormState.editing;
      if (payload.body) state.productForm.body = payload.body;
    },
  };

  creators = {
    fetchTable,
    fetchForm,
    insert,
    update,
    generateId,
  };

  builder = (
    builder: ActionReducerMapBuilder<CreatorState & ProductScreenState>
  ) => {
    this.createBuilder<ProductSqlRawProps[]>(
      builder,
      fetchTable,
      (state, { payload }) => {
        return {
          ...state,
          productTable: {
            state: RequestState.fulfilled,
            data: payload?.map((product) => ({
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
        pending: (state) => {
          state.screenProductSpinner = SpinnerState.show;
        },
        rejected: (state) => {
          state.screenProductSpinner = SpinnerState.hidden;
        },
      }
    );

    this.createBuilder<StateFormProps<ProductSqlRawProps>>(
      builder,
      fetchForm,
      (state, { payload }) => {
        if (!payload.body?.id) {
          state.productForm = {
            ...payload,
            body: {
              ...dbProducts.transform(payload?.body),
            },
          };
        } else {
          state.productForm = {
            ...payload,
            body: {
              ...dbProducts.transform(payload?.body),
              productCategory: dbProductCategories.transform(
                payload?.body?.product_category
              ),
            },
          };
        }
      }
    );

    this.createBuilder<ProductSqlRawProps>(
      builder,
      insert,
      (state, { payload }): ProductScreenState => {
        const productList = Object.assign([], state.productTable?.data || []);
        productList.unshift({
          ...dbProducts.transform(payload),
          productCategory: dbProductCategories.transform(
            payload.product_category
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
        pending: (state) => {
          state.productForm.state = FormState.pending;
        },
        rejected: (state) => {
          state.productForm.state = FormState.editing;
        },
      }
    );

    this.createBuilder<ProductSqlRawProps>(
      builder,
      update,
      (state, { payload }): ProductScreenState => {
        return {
          ...state,
          productForm: {
            state: FormState.sumbmitted,
            body: undefined,
          },
          productTable: {
            ...state.productTable,
            data: Object.assign([], state.productTable.data).map((product) => {
              if (product.id === payload.id) {
                return <ProductTransformedProps>{
                  ...dbProducts.transform(payload),
                  productCategory: dbProductCategories.transform(
                    payload.product_category
                  ),
                };
              } else {
                return product;
              }
            }),
          },
        };
      },
      {
        pending: (state) => {
          state.productForm.state = FormState.pending;
        },
        rejected: (state) => {
          state.productForm.state = FormState.editing;
        },
      }
    );

    this.createBuilder<string>(
      builder,
      generateId,
      (state, { payload }): ProductScreenState => {
        return {
          ...state,
          productForm: {
            state: FormState.editing,
            body: {
              ...state.productForm?.body,
              productId: payload,
            },
          },
        };
      },
      {
        pending: (state) => {
          state.productForm.state = FormState.pending;
        },
        rejected: (state) => {
          state.productForm.state = FormState.editing;
        },
      }
    );
  };
}

export const productCreators = new ProductCreators();
