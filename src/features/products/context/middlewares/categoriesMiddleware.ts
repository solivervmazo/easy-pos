import { dbProductCategories } from "../db/categories";
import { RequestState } from "../../../../enums";
import {
  ContextMiddleware,
  ContextResponseEither,
  ContextResponseError,
  ContextResponseSucess,
  SqlTransactionRequestArgs,
  responseIsError,
  responseIsSuccess,
} from "../../../../context-manager";
import { generateStringId } from "../../../../utils";
import { CategorySqlRawProps, CategoryTransformedProps } from "../../types";
import { SQLTransactionAsync } from "expo-sqlite";
import { DbInsertResponse, ReduxActionRequestArgs } from "../../../../types";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

const categoryDetailParamsInternal = ({ id }: { id: number }) => {
  return dbProductCategories.selectQuery({
    args: { id },
    limit: 1,
  });
};

const injectParentCategoryInternal = async (
  fnRequest: <T>(
    { query, args }: SqlTransactionRequestArgs,
    ...rest: any
  ) => Promise<ContextResponseEither<CategorySqlRawProps[]>>,
  ctx: SQLTransactionAsync,
  category: CategorySqlRawProps
): Promise<CategorySqlRawProps> => {
  if (category.category_parent_id) {
    const id = category.category_parent_id;

    const requestCategory = await fnRequest<CategorySqlRawProps[]>(
      categoryDetailParamsInternal({ id }),
      undefined,
      ctx
    );
    if (
      responseIsSuccess<CategorySqlRawProps[]>(requestCategory) &&
      requestCategory.body.length === 1
    ) {
      return {
        ...category,
        category_parent: requestCategory.body[0],
      };
    }
  }
  return category;
};

export class RequestProductCategoryListMiddleware extends ContextMiddleware<
  CategorySqlRawProps[]
> {
  ctx: SQLTransactionAsync;
  orderBy: string;
  desc: boolean;
  constructor(
    ctx: SQLTransactionAsync,
    { orderBy = "id", desc = true }: ReduxActionRequestArgs<{}>
  ) {
    super();
    this.ctx = ctx;
    this.orderBy = orderBy;
    this.desc = desc;
  }
  exec = async () => {
    const { ctx, orderBy, desc } = this;
    const { query, args } = dbProductCategories.selectQuery({ orderBy, desc });
    const makeRequestCategories = await this.requestSqlContext(
      { query, args },
      db_name,
      ctx
    );
    if (responseIsSuccess(makeRequestCategories)) {
      let categoryList = makeRequestCategories?.body || [];
      for (const [index, row] of categoryList.entries()) {
        categoryList[index] = await injectParentCategoryInternal(
          this.requestSqlContext,
          ctx,
          row
        );
      }
      return {
        ...makeRequestCategories,
        body: categoryList,
      };
    }
    return makeRequestCategories;
  };
}

export class RequestProductCategoryDetailMiddleware extends ContextMiddleware<CategorySqlRawProps> {
  ctx: SQLTransactionAsync;
  id: number;
  isForm: boolean;
  constructor(
    ctx: SQLTransactionAsync,
    {
      id = 0,
      isForm = false,
    }: ReduxActionRequestArgs<{}, { id: number; isForm?: boolean }>
  ) {
    super();
    this.ctx = ctx;
    this.id = id;
    this.isForm = isForm;
  }
  exec = async () => {
    const { ctx, id, isForm } = this;
    if (id) {
      const response = await this.requestSqlContext<CategorySqlRawProps[]>(
        categoryDetailParamsInternal({ id }),
        undefined,
        ctx
      );
      if (
        responseIsSuccess<CategorySqlRawProps[]>(response) &&
        response.body.length === 1
      ) {
        return this.makeResponse(
          response.state,
          await injectParentCategoryInternal(
            this.requestSqlContext,
            ctx,
            response.body[0]
          )
        );
      } else {
        return this.makeResponse(
          RequestState.error,
          "Unable to find product category"
        );
      }
    }
    if (isForm) {
      return this.makeResponse(RequestState.fulfilled, {
        id: 0,
        category_id: "",
        category_name: "",
      });
    }
    return this.makeResponse(RequestState.error, "Unable to find category");
  };
}

export class InsertProductCategoryMiddleware extends ContextMiddleware<CategorySqlRawProps> {
  ctx: SQLTransactionAsync;
  payload: CategoryTransformedProps;
  constructor(
    ctx: SQLTransactionAsync,
    { payload }: { payload: CategoryTransformedProps }
  ) {
    super();
    this.ctx = ctx;
    this.payload = payload;
  }
  exec = async () => {
    const { ctx, payload } = this;
    const { query, args } = dbProductCategories.insertQuery(payload);
    const makeRequestInsert = await this.requestSqlContext<DbInsertResponse>(
      { query, args },
      undefined,
      ctx
    );
    if (responseIsSuccess<{ insertId: number }>(makeRequestInsert)) {
      let categoryInserted: CategorySqlRawProps;
      const makeRequestProductDetail = await this.requestSqlContext<
        CategorySqlRawProps[]
      >(
        categoryDetailParamsInternal({ id: makeRequestInsert.body.insertId }),
        undefined,
        ctx
      );
      if (
        responseIsSuccess<CategorySqlRawProps[]>(makeRequestProductDetail) &&
        makeRequestProductDetail.body.length == 1
      ) {
        categoryInserted = await injectParentCategoryInternal(
          this.requestSqlContext,
          ctx,
          makeRequestProductDetail.body[0]
        );
      }
      return this.makeResponse(makeRequestInsert.state, categoryInserted);
    }
    return this.makeResponse(
      makeRequestInsert.state,
      "Something whent wrong will inserting product category"
    );
  };
}

export class RequestUpdateProductCategoryMiddleware extends ContextMiddleware<CategorySqlRawProps> {
  ctx: SQLTransactionAsync;
  payload: CategoryTransformedProps;
  oldCategory: CategorySqlRawProps;
  constructor(
    ctx: SQLTransactionAsync,
    {
      payload,
      oldCategory,
    }: { payload: CategoryTransformedProps; oldCategory: CategorySqlRawProps }
  ) {
    super();
    this.ctx = ctx;
    this.payload = payload;
    this.oldCategory = oldCategory;
  }
  exec = async () => {
    const { ctx, payload, oldCategory } = this;
    const { query, args } = dbProductCategories.updateQuery(payload);
    let response:
      | ContextResponseError
      | ContextResponseSucess<CategorySqlRawProps>;
    const updateRequest = await this.requestSqlContext(
      { query, args },
      undefined,
      ctx
    );
    if (responseIsSuccess<CategorySqlRawProps>(updateRequest)) {
      const requestUpdatedCategory = await this.requestSqlContext<
        CategorySqlRawProps[]
      >(categoryDetailParamsInternal({ id: payload.id }), undefined, ctx);
      if (
        responseIsSuccess<CategorySqlRawProps[]>(requestUpdatedCategory) &&
        requestUpdatedCategory.body.length === 1
      ) {
        let updatedCategory = await injectParentCategoryInternal(
          this.requestSqlContext,
          ctx,
          requestUpdatedCategory.body[0]
        );
        response = this.makeResponse(updateRequest.state, updatedCategory);
        if (
          oldCategory?.category_parent_id != updatedCategory?.category_parent_id
        ) {
          //Update all sub category's level to  category_level - (this's old categoryLevel - new categoryLevel)
          //new category_parent_id == 0 ? Update all sub category's category_root_id to this's id
          //new category_parent_id != 0 ? Update all sub category's category_root_id to this's category_root_id
          const { query: queryTree, args: argsTree } =
            dbProductCategories.updateTreeQuery({
              categoryId: updatedCategory.id,
              categoryRootId: updatedCategory.category_root_id,
              categoryLevelReduce:
                oldCategory.category_level - updatedCategory.category_level,
            });

          const updatedCategoryTree = await this.requestSqlContext(
            { query: queryTree, args: argsTree },
            undefined,
            ctx
          );
          if (responseIsError(updatedCategoryTree)) {
            response = updatedCategoryTree;
          }
        }
        response = response;
      }
    }
    return response;
  };
}

export class RequestProductCategoryNewId extends ContextMiddleware<string> {
  ctx: SQLTransactionAsync;
  random: boolean;
  constructor(ctx: SQLTransactionAsync, { random } = { random: false }) {
    super();
    this.ctx = ctx;
    this.random = random;
  }
  exec = async () => {
    const { ctx, random } = this;
    const { query, args } = dbProductCategories.selectQuery({
      orderBy: "id",
      desc: true,
      limit: 1,
    });
    const response = await this.requestSqlContext<CategorySqlRawProps[]>(
      { query, args },
      undefined,
      ctx
    );
    if (responseIsSuccess<CategorySqlRawProps[]>(response)) {
      const latestCategoryId: number = response?.body?.[0]?.id || 0;
      return this.makeResponse(
        response.state,
        generateStringId(latestCategoryId, random)
      );
    }
    return this.makeResponse(
      RequestState.error,
      "Unable to generate product category id"
    );
  };
}
