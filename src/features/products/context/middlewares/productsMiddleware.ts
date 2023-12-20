import { RequestState } from "../../../../enums";
import { dbProducts, dbProductCategories } from "../db";
import {
  ContextMiddleware,
  ContextResponseEither,
  SqlTransactionRequestArgs,
  responseIsSuccess,
} from "../../../../context-manager";
import { generateStringId } from "../../../../utils";
import { SQLTransactionAsync } from "expo-sqlite";
import {
  CategorySqlRawProps,
  ProductSqlRawProps,
  ProductTransformedProps,
} from "../../types";
import { DbRequestArgs, ReduxActionRequestArgs } from "../../../../types";
import { DbInsertResponse } from "../../../../types";

const productDetailParamsInternal = ({ id }) => {
  return dbProducts.selectQuery({
    args: { id },
    limit: 1,
  });
};

const injectCategoryDetailInternal = async (
  fnRequest: <T>(
    { query, args }: SqlTransactionRequestArgs,
    ...rest: any
  ) => Promise<ContextResponseEither<CategorySqlRawProps[]>>,
  ctx: SQLTransactionAsync,
  product: ProductSqlRawProps
): Promise<ProductSqlRawProps> => {
  if (product.product_category_id) {
    const id = product.product_category_id;

    const { query, args } = dbProductCategories.selectQuery({
      args: { id },
      limit: 1,
    });
    const requestCategory = await fnRequest<CategorySqlRawProps[]>(
      { query, args },
      undefined,
      ctx
    );
    if (
      responseIsSuccess<CategorySqlRawProps[]>(requestCategory) &&
      requestCategory.body.length === 1
    ) {
      return {
        ...product,
        product_category: requestCategory.body[0],
      };
    }
  }
  return product;
};

export class RequestProductListMiddleware extends ContextMiddleware<
  ProductSqlRawProps[]
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
    const { query, args } = dbProducts.selectQuery({ orderBy, desc });
    const makeRequestProducts = await this.requestSqlContext(
      { query, args },
      undefined,
      ctx
    );
    if (responseIsSuccess<ProductSqlRawProps[]>(makeRequestProducts)) {
      let productList = makeRequestProducts?.body || [];
      for (const [index, row] of productList.entries()) {
        productList[index] = await injectCategoryDetailInternal(
          this.requestSqlContext,
          ctx,
          row
        );
      }
      return {
        ...makeRequestProducts,
        body: productList,
      };
    }
    return makeRequestProducts;
  };
}

export class RequestProductDetailMiddleware extends ContextMiddleware<ProductSqlRawProps> {
  ctx: SQLTransactionAsync;
  id: number;
  constructor(ctx: SQLTransactionAsync, { id }) {
    super();
    this.ctx = ctx;
    this.id = id;
  }
  exec = async () => {
    const { ctx, id } = this;
    if (id) {
      const response = await this.requestSqlContext<ProductSqlRawProps[]>(
        productDetailParamsInternal({ id }),
        undefined,
        ctx
      );
      if (
        responseIsSuccess<ProductSqlRawProps[]>(response) &&
        response.body.length === 1
      ) {
        return this.makeResponse(
          response.state,
          await injectCategoryDetailInternal(
            this.requestSqlContext,
            ctx,
            response.body[0]
          )
        );
      } else {
        return this.makeResponse(RequestState.error, "Unable to find product");
      }
    }
    //Make fullfilled response
    return this.makeResponse(RequestState.fulfilled, {
      id: 0,
      product_id: "",
      product_name: "",
    });
  };
}

export class RequestInsertProductMiddleware extends ContextMiddleware<ProductSqlRawProps> {
  ctx: SQLTransactionAsync;
  payload: ProductTransformedProps;
  constructor(ctx: SQLTransactionAsync, { payload }) {
    super();
    this.ctx = ctx;
    this.payload = payload;
  }
  exec = async () => {
    const { ctx, payload } = this;
    const { query, args } = dbProducts.insertQuery(payload);
    const makeRequestInsert = await this.requestSqlContext<DbInsertResponse>(
      { query, args },
      undefined,
      ctx
    );
    if (responseIsSuccess<{ insertId: number }>(makeRequestInsert)) {
      let productInserted: ProductSqlRawProps;
      const makeRequestProductDetail = await this.requestSqlContext<
        ProductSqlRawProps[]
      >(
        productDetailParamsInternal({ id: makeRequestInsert.body.insertId }),
        undefined,
        ctx
      );
      if (
        responseIsSuccess<ProductSqlRawProps[]>(makeRequestProductDetail) &&
        makeRequestProductDetail.body.length == 1
      ) {
        productInserted = await injectCategoryDetailInternal(
          this.requestSqlContext,
          ctx,
          makeRequestProductDetail.body[0]
        );
      }
      return this.makeResponse(makeRequestInsert.state, productInserted);
    }
    return this.makeResponse(
      makeRequestInsert.state,
      "Something whent wrong will inserting product"
    );
  };
}

export class RequestUpdateProductMiddleware extends ContextMiddleware<ProductSqlRawProps> {
  ctx: SQLTransactionAsync;
  payload: ProductTransformedProps;
  constructor(
    ctx: SQLTransactionAsync,
    { payload }: { payload: ProductTransformedProps }
  ) {
    super();
    this.ctx = ctx;
    this.payload = payload;
  }
  exec = async () => {
    const { ctx, payload } = this;
    const { query, args } = dbProducts.updateQuery(payload);
    const updateRequest = await this.requestSqlContext(
      { query, args },
      undefined,
      ctx
    );
    if (responseIsSuccess<ProductSqlRawProps>(updateRequest)) {
      const requestUpdatedProduct = await this.requestSqlContext<
        ProductSqlRawProps[]
      >(productDetailParamsInternal({ id: payload.id }), undefined, ctx);
      if (
        responseIsSuccess<ProductSqlRawProps[]>(requestUpdatedProduct) &&
        requestUpdatedProduct.body.length === 1
      ) {
        const updatedProduct = await injectCategoryDetailInternal(
          this.requestSqlContext,
          ctx,
          requestUpdatedProduct.body[0]
        );
        return this.makeResponse(updateRequest.state, updatedProduct);
      }
    }
    return updateRequest;
  };
}

export class RequestProductNewIdMidleware extends ContextMiddleware<string> {
  ctx: SQLTransactionAsync;
  random: boolean;
  constructor(ctx: SQLTransactionAsync, { random } = { random: false }) {
    super();
    this.ctx = ctx;
    this.random = random;
  }
  exec = async () => {
    const { ctx, random } = this;
    const { query, args } = dbProducts.selectQuery({
      orderBy: "id",
      desc: true,
      limit: 1,
    });
    const response = await this.requestSqlContext<ProductSqlRawProps[]>(
      { query, args },
      undefined,
      ctx
    );
    if (responseIsSuccess<ProductSqlRawProps[]>(response)) {
      const latestProductId: number = response?.body?.[0]?.id || 0;
      return this.makeResponse(
        response.state,
        generateStringId(latestProductId, random)
      );
    }
    return this.makeResponse(
      RequestState.error,
      "Unable to generate product id"
    );
  };
}
