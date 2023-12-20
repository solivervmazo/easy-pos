import {
  ContextResponseEither,
  ContextResponseSucess,
  RequestState,
  makeContextRequests,
  responseIsSuccess,
} from "../../../context-manager";
import {
  ContextErrorResponseMiddleware,
  ContextSourceMiddleware,
} from "../../../my-app";
import { DbRequestArgs, ReduxActionRequestArgs } from "../../../types";
import { CategorySqlRawProps, CategoryTransformedProps } from "../types";
import {
  InsertProductCategoryMiddleware,
  RequestProductCategoryDetailMiddleware,
  RequestProductCategoryListMiddleware,
  RequestProductCategoryNewId,
  RequestUpdateProductCategoryMiddleware,
} from "./middlewares/categoriesMiddleware";
import { SQLTransactionAsync } from "expo-sqlite";

export const requestProductCategoryList = async (
  ctx: SQLTransactionAsync,
  {
    orderBy,
    desc,
  }: ReduxActionRequestArgs<CategoryTransformedProps, DbRequestArgs> = {
    orderBy: "id",
    desc: true,
  }
) => {
  let response: ContextResponseEither<CategorySqlRawProps[]>;
  const pipeline = await makeContextRequests(
    ["source", new ContextSourceMiddleware(), true],
    [
      "categories",
      new RequestProductCategoryListMiddleware(ctx, {
        orderBy,
        desc,
      }),
      true,
    ]
  );
  response = pipeline.categories;
  return response;
};

export const requestProductCategoryDetail = async (
  ctx: SQLTransactionAsync,
  { args: { id } }: ReduxActionRequestArgs<{ id?: number }, DbRequestArgs> = {
    args: { id: undefined },
  }
) => {
  let response: ContextResponseEither<CategorySqlRawProps>;
  await makeContextRequests(
    ["source", new ContextSourceMiddleware(), true],
    [
      "category",
      new RequestProductCategoryDetailMiddleware(ctx, { id, isForm: false }),
      ({ category }) => {
        response = category;
        return true;
      },
    ]
  );
  return response;
};

export const requestProductCategoryForm = async (
  ctx: SQLTransactionAsync,
  { args: { id } }: ReduxActionRequestArgs<{ id?: number }, DbRequestArgs> = {
    args: { id: undefined },
  }
) => {
  let response: ContextResponseEither<CategorySqlRawProps>;
  await makeContextRequests(
    ["source", new ContextSourceMiddleware(), true],
    [
      "category",
      new RequestProductCategoryDetailMiddleware(ctx, { id, isForm: true }),
      ({ category }) => {
        if (responseIsSuccess<CategorySqlRawProps>(category)) {
          response = category;
          return response.body?.id ? false : "generateId";
        }
        return "error";
      },
    ],
    [
      "generateId",
      new RequestProductCategoryNewId(ctx),
      ({ generateId, category }) => {
        if (
          responseIsSuccess<CategorySqlRawProps>(category) &&
          responseIsSuccess<string>(generateId)
        ) {
          response = {
            ...category,
            body: {
              ...category?.body,
              category_id: generateId?.body,
            },
          };
          return false;
        }
      },
    ],
    [
      "error",
      new ContextErrorResponseMiddleware("Unable to to fetch category"),
      ({ error }) => {
        response = error;
        return true;
      },
    ]
  );
  return response;
};

export const requestInsertProductCategory = async (
  ctx: SQLTransactionAsync,
  { args }: ReduxActionRequestArgs<CategoryTransformedProps>
) => {
  let response: ContextResponseEither<CategorySqlRawProps>;
  await makeContextRequests(
    ["source", new ContextSourceMiddleware(), true],
    [
      "insertedCategory",
      new InsertProductCategoryMiddleware(ctx, { payload: args }),
      ({ insertedCategory }) => {
        if (responseIsSuccess(insertedCategory)) {
          response = insertedCategory;
          return false;
        }
        return "error";
      },
    ],
    [
      "error",
      new ContextErrorResponseMiddleware("Unable to to insert category"),
      ({ error }) => {
        response = error;
        return true;
      },
    ]
  );
  return response;
};

export const requestUpdateProductCategory = async (
  ctx: SQLTransactionAsync,
  { args }: ReduxActionRequestArgs<CategoryTransformedProps>
) => {
  let response: ContextResponseEither<CategorySqlRawProps>;
  await makeContextRequests(
    ["source", new ContextSourceMiddleware(), true],
    [
      "oldCategory",
      new RequestProductCategoryDetailMiddleware(ctx, {
        id: args.id,
      }),
      ({ oldCategory }) => {
        if (responseIsSuccess<CategorySqlRawProps>(oldCategory)) {
          return true;
        }
        return "error";
      },
    ],
    [
      "updatedCategory",
      ({ oldCategory }) => {
        return new RequestUpdateProductCategoryMiddleware(ctx, {
          payload: args,
          oldCategory: (<ContextResponseSucess<CategorySqlRawProps>>oldCategory)
            .body,
        });
      },
      ({ updatedCategory }) => {
        if (responseIsSuccess(updatedCategory)) {
          response = updatedCategory;
          return false;
        }
        response = updatedCategory;
      },
    ]
  );
  return response;
};

export const requestProductCategoryNewId = async (
  ctx: SQLTransactionAsync,
  { args: { random = true } }: ReduxActionRequestArgs<{ random: boolean }>
) => {
  let response: ContextResponseEither<string>;
  await makeContextRequests(
    ["source", new ContextSourceMiddleware(), true],
    [
      "generateId",
      new RequestProductCategoryNewId(ctx, { random }),
      ({ generateId }) => {
        if (generateId?.state === RequestState.fulfilled) {
          response = generateId;
          return false;
        }
        return "error";
      },
    ],
    [
      "error",
      new ContextErrorResponseMiddleware("Unable to generate category id"),
      ({ error }) => {
        response = error;
        return true;
      },
    ]
  );
  return response;
};
