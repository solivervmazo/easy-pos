import { RequestState, makeContextRequests } from "../../../context-manager";
import {
  ContextErrorResponseMiddleware,
  ContextSourceMiddleware,
} from "../../../my-app/";
import {
  InsertProductCategoryMiddleware,
  RequestProductCategoryDetailMiddleware,
  RequestProductCategoryListMiddleware,
  RequestProductCategoryNewId,
  RequestUpdateProductCategoryMiddleware,
} from "./middlewares/categoriesMiddleware";
import * as SQLlite from "expo-sqlite";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const requestProductCategoryList = async (
  db,
  { orderBy = "id", desc = true } = {}
) => {
  let categories = {};
  const sqlDb = db || SQLlite.openDatabase(db_name);
  await sqlDb.transactionAsync(async (ctx) => {
    const pipeline = await makeContextRequests(
      ["source", new ContextSourceMiddleware(), true],
      [
        "categories",
        new RequestProductCategoryListMiddleware(false, ctx, {
          orderBy,
          desc,
        }),
        true,
      ]
    );
    categories = pipeline.categories;
  });
  return categories;
};

export const requestProductCategoryDetail = async (db, { id }) => {
  let category = {};
  const sqlDb = db || SQLlite.openDatabase(db_name);
  await sqlDb.transactionAsync(async (ctx) => {
    const pipeline = await makeContextRequests(
      ["source", new ContextSourceMiddleware(), true],
      [
        "category",
        new RequestProductCategoryDetailMiddleware(false, ctx, { id }),
        true,
      ]
    );
    category = pipeline.category;
  });
  return category;
};

export const requestInsertProductCategory = async (ctx, { payload }) => {
  let category = {};
  await makeContextRequests(
    ["source", new ContextSourceMiddleware(), true],
    [
      "insertCategory",
      new InsertProductCategoryMiddleware(false, ctx, { payload }),
      (responses) => {
        if (responses.insertCategory?.state === RequestState.fulfilled) {
          insertedId = responses.insertCategory?.body[0]?.insertId;
          return true;
        }
        return "error";
      },
    ],
    [
      "category",
      (responses) => {
        const insertedId = responses.insertCategory?.body[0]?.insertId;
        return new RequestProductCategoryDetailMiddleware(false, ctx, {
          id: insertedId,
        });
      },
      (responses) => {
        category = responses.category;
        return false;
      },
    ],
    [
      "error",
      new ContextErrorResponseMiddleware("Unable to to insert category"),
      (response) => {
        category = response.error;
        return true;
      },
    ]
  );
  return category;
};

export const requestUpdateProductCategory = async (ctx, { payload }) => {
  let category = {};
  await makeContextRequests(
    ["source", new ContextSourceMiddleware(), true],
    // get old category and check at the same time
    [
      "oldCategory",
      new RequestProductCategoryDetailMiddleware(false, ctx, {
        id: payload.id,
      }),
      ({ oldCategory }) => {
        if (oldCategory?.state == RequestState.fulfilled) {
          return true;
        }
        return "error";
      },
    ],
    [
      "updatedCategory",
      ({ oldCategory }) => {
        return new RequestUpdateProductCategoryMiddleware(false, ctx, {
          payload,
          oldCategory,
        });
      },
      ({ updatedCategory }) => {
        if (updatedCategory?.state === RequestState.fulfilled) {
          insertedId = updatedCategory?.body[0]?.insertId;
          return true;
        }
        return "error";
      },
    ],
    [
      "categoryParent",
      ({ updatedCategory }) => {
        const updatedCategoryId =
          updatedCategory?.body?.[0]?.category_parent_id;
        return new RequestProductCategoryDetailMiddleware(false, ctx, {
          id: updatedCategoryId,
        });
      },
      ({ updatedCategory, categoryParent }) => {
        category = {
          ...updatedCategory,
          body: {
            ...updatedCategory.body[0],
            category_parent: categoryParent?.body ?? null,
          },
        };
        return false;
      },
    ],
    [
      "error",
      new ContextErrorResponseMiddleware("Unable to update category"),
      (response) => {
        category = response.error;
        return true;
      },
    ]
  );
  return category;
};

export const requestProductCategoryNewId = async (
  db,
  ctx,
  { random = false } = {}
) => {
  let categoryResponse = "";
  await makeContextRequests(
    ["source", new ContextSourceMiddleware(), true],
    [
      "generateId",
      new RequestProductCategoryNewId(db, ctx, { random }),
      ({ generateId }) => {
        if (generateId?.state === RequestState.fulfilled) {
          categoryResponse = generateId;
          return false;
        }
        return "error";
      },
    ],
    [
      "error",
      new ContextErrorResponseMiddleware("Unable to to insert category"),
      (response) => {
        categoryResponse = response.error;
        return true;
      },
    ]
  );
  return categoryResponse;
};
