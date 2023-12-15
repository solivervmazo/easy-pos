import { createAsyncThunk } from "@reduxjs/toolkit";
import * as SQLlite from "expo-sqlite";
import { FormState, RequestState, SpinnerState } from "../../../../enums";
import { dbProductCategories } from "../../db/categories";
import {
  requestProductCategoryList,
  requestProductCategoryDetail,
  requestProductCategoryNewId,
  requestInsertProductCategory,
  requestUpdateProductCategory,
} from "../../context/categories";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

const fetchTable = createAsyncThunk(
  "products/fetchCategoryAction",
  async (payload = {}) => {
    const db = SQLlite.openDatabase(db_name);
    const { orderBy = "id", desc = true } = payload;
    const productCategoryList = await requestProductCategoryList(db, {
      db,
      orderBy,
      desc,
    });
    const tableRows = productCategoryList?.body || [];
    await Promise.all(
      tableRows.map(async (row, index) => {
        if (row.category_parent_id) {
          const requestCategoryParent = await requestProductCategoryDetail(db, {
            id: row.category_parent_id,
          });
          if (requestCategoryParent.state === RequestState.fulfilled) {
            tableRows[index]["category_parent"] = requestCategoryParent.body;
          }
        }
      })
    );
    return tableRows;
  }
);

const fetchDetail = createAsyncThunk(
  "products/fetchCategoryDetail",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    if (!payload.id) {
      const request = await requestProductCategoryNewId(db, false);
      if (request.state === RequestState.fulfilled) {
        return {
          state: FormState.idle,
          body: {
            category_id: request.body,
          },
        };
      } else {
        throw Error(request.message);
      }
    } else {
      const request = await requestProductCategoryDetail(false, {
        id: payload.id,
      });
      if (request.state === RequestState.fulfilled) {
        const categoryDetail = {
          ...request.body,
        };
        const parentId = categoryDetail.category_parent_id;
        if (parentId) {
          const requestParent = await requestProductCategoryDetail(false, {
            id: parentId,
          });
          if (requestParent.state == RequestState.fulfilled) {
            categoryDetail["category_parent"] = requestParent.body;
          }
        }
        return { state: FormState.idle, body: categoryDetail };
      } else {
        throw Error(request.message);
      }
    }
  }
);

const insert = createAsyncThunk("products/insertCategory", async (payload) => {
  const db = SQLlite.openDatabase(db_name);
  let response = null;
  await db.transactionAsync(async (ctx) => {
    const insertedProductCategory = await requestInsertProductCategory(ctx, {
      payload,
    });
    if (insertedProductCategory.state === RequestState.fulfilled) {
      const insertedCategory = insertedProductCategory.body;
      if (insertedCategory.category_parent_id) {
        const makeRequestCategoryParentDetail =
          await requestProductCategoryDetail(db, {
            id: insertedCategory.category_parent_id,
          });
        if (makeRequestCategoryParentDetail.state == RequestState.fulfilled) {
          insertedCategory["category_parent"] =
            makeRequestCategoryParentDetail.body;
        }
      }
      response = insertedCategory;
    } else {
      throw Error(insertedProductCategory.error);
    }
  });
  return response;
});

const update = createAsyncThunk(
  "products/updateCategoryAction",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    let response = null;
    await db.transactionAsync(async (ctx) => {
      const makeRequestUpdateProductCategory =
        await requestUpdateProductCategory(ctx, {
          payload,
        });
      response = makeRequestUpdateProductCategory.body;
      if (response.state === RequestState.error) throw Error(response.error);
    });
    return response;
  }
);

class CategoryCreators {
  static state = {
    screenCategorySpinner: SpinnerState.show,
    categoryForm: undefined,
    categoryTable: {
      state: RequestState.idle,
      data: undefined,
    },
  };

  static actions = {
    restartForm: (state) => {
      return {
        ...state,
        categoryForm: undefined,
      };
    },
    updateForm: (state, { payload }) => {
      state.categoryForm.state = payload.state || FormState.editing;
      if (payload.body) state.categoryForm.body = payload.body;
    },
  };

  static creators = {
    fetchTable,
    fetchDetail,
    insert,
    update,
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
      (state, { payload }) => {
        return {
          ...state,
          categoryTable: {
            state: RequestState.fulfilled, //No use
            data: payload?.map((category) => ({
              ...dbProductCategories.transform(category),
              categoryParent: dbProductCategories.transform(
                category.category_parent
              ),
            })),
          },
          screenCategorySpinner: SpinnerState.hidden,
        };
      },
      {
        pending: (state) => (state.screenCategorySpinner = SpinnerState.show),
        rejected: (state) =>
          (state.screenCategorySpinner = SpinnerState.hidden),
      }
    );

    createBuilder(builder, fetchDetail, (state, { payload }) => {
      const category = payload?.body;
      return {
        ...state,
        categoryForm: {
          ...payload,
          body: {
            ...dbProductCategories.transform(category),
            categoryParent: dbProductCategories.transform(
              category.category_parent
            ),
          },
        },
      };
    });

    createBuilder(
      builder,
      insert,
      (state, action) => {
        const categoryList = Object.assign([], state.categoryTable?.data || []);
        categoryList.unshift({
          ...dbProductCategories.transform(action.payload),
          categoryParent: dbProductCategories.transform(
            action.payload.category_parent
          ),
        });
        return {
          ...state,
          categoryForm: {
            state: FormState.sumbmitted,
            body: undefined,
          },
          categoryTable: {
            ...state.categoryTable,
            data: categoryList,
          },
        };
      },
      {
        pending: (state) => (state.categoryForm.state = FormState.pending),
        rejected: (state) => (state.categoryForm.state = FormState.editing),
      }
    );

    createBuilder(
      builder,
      update,
      (state, action) => {
        return {
          ...state,
          categoryForm: {
            state: FormState.sumbmitted,
            body: undefined,
          },
          categoryTable: {
            ...state.categoryTable,
            data: Object.assign([], state.categoryTable.data).map(
              (category) => {
                if (category.id === action.payload.id) {
                  return {
                    ...dbProductCategories.transform(action.payload),
                    categoryParent: dbProductCategories.transform(
                      action.payload.category_parent
                    ),
                  };
                } else {
                  return category;
                }
              }
            ),
          },
        };
      },
      {
        pending: (state) => (state.categoryForm.state = FormState.pending),
        rejected: (state) => (state.categoryForm.state = FormState.editing),
      }
    );
  };
}

export const categoryCreators = CategoryCreators;
