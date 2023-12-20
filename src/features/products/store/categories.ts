import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { FormState, RequestState, SpinnerState } from "../../../enums";
import {
  CreatorState,
  IStateCreators,
  StateCreatorsBuilder,
  StateFormProps,
} from "../../../my-app";
import { CategoryScreenState, CategorySqlRawProps } from "../types";
import { fetchTable, fetchForm, insert, update } from "./actions/categories";
import { dbProductCategories } from "../context/db";

type ScreenState = CategoryScreenState;

class CategoryCreators
  extends StateCreatorsBuilder<ScreenState>
  implements IStateCreators<ScreenState>
{
  constructor() {
    super();
  }
  state = {
    screenCategorySpinner: SpinnerState.show,
    categoryForm: undefined,
    categoryTable: {
      state: RequestState.idle,
      data: undefined,
    },
  };

  actions = {
    restartForm: (state: CategoryScreenState) => {
      return {
        ...state,
        categoryForm: undefined,
      };
    },
    updateForm: (
      state: CategoryScreenState,
      args: { payload: CategoryScreenState["categoryForm"] }
    ) => {
      const { payload } = args;
      state.categoryForm.state = payload.state || FormState.editing;
      if (payload.body) state.categoryForm.body = payload.body;
    },
  };

  creators = {
    fetchTable,
    fetchForm,
    insert,
    update,
  };

  builder = (
    builder: ActionReducerMapBuilder<CreatorState & CategoryScreenState>
  ) => {
    this.createBuilder<CategorySqlRawProps[]>(
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
        pending: (state) => {
          state.screenCategorySpinner = SpinnerState.show;
        },
        rejected: (state) => {
          state.screenCategorySpinner = SpinnerState.hidden;
        },
      }
    );

    this.createBuilder<StateFormProps<CategorySqlRawProps>>(
      builder,
      fetchForm,
      (state, { payload }) => {
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
      }
    );

    this.createBuilder<CategorySqlRawProps>(
      builder,
      insert,
      (state, { payload }) => {
        const categoryList = Object.assign([], state.categoryTable?.data || []);
        categoryList.unshift({
          ...dbProductCategories.transform(payload),
          categoryParent: dbProductCategories.transform(
            payload.category_parent
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
        pending: (state) => {
          state.categoryForm.state = FormState.pending;
        },
        rejected: (state) => {
          state.categoryForm.state = FormState.editing;
        },
      }
    );

    this.createBuilder<CategorySqlRawProps>(
      builder,
      update,
      (state, { payload }) => {
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
                if (category.id === payload.id) {
                  return {
                    ...dbProductCategories.transform(payload),
                    categoryParent: dbProductCategories.transform(
                      payload.category_parent
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
        pending: (state) => {
          state.categoryForm.state = FormState.pending;
        },
        rejected: (state) => {
          state.categoryForm.state = FormState.editing;
        },
      }
    );
  };
}

export const categoryCreators = new CategoryCreators();
