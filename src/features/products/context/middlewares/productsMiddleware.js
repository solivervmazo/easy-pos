import { RequestState } from "../../../../enums";
import { dbProducts, dbProductCategories } from "../../db/";
import { ContextMiddleware } from "../../../../context-manager";
export class RequestProductListMiddleware extends ContextMiddleware {
  constructor(db, ctx, { orderBy = "id", desc = true }) {
    super();
    this.db = db;
    this.ctx = ctx;
    this.orderBy = orderBy;
    this.desc = desc;
  }
  exec = async () => {
    const { db, ctx, orderBy, desc } = this;
    const { query, args } = dbProducts.selectQuery({ orderBy, desc });
    const makeRequestProducts = await this.requestSqlContext(
      { query, args },
      db,
      ctx
    );
    if (makeRequestProducts.state === RequestState.fulfilled) {
      let productList = makeRequestProducts?.body || [];
      for (const [index, row] of productList.entries()) {
        productList[index] = {
          ...productList[index],
          product_category: undefined,
        };
        if (row.category_id) {
          const { query: queryCategory, args: argsCategory } =
            dbProductCategories.selectQuery({
              args: { id: row.category_id },
              limit: 1,
            });
          const requestCategory = await this.requestSqlContext(
            { query: queryCategory, args: argsCategory },
            db,
            ctx
          );
          if (
            requestCategory.state === RequestState.fulfilled &&
            requestCategory.body.length === 1
          ) {
            productList[index] = {
              ...row,
              product_category: requestCategory.body[0],
            };
          }
        }
      }
      return {
        ...makeRequestProducts,
        body: productList,
      };
    }
    return makeRequestProducts;
  };
}

export class RequestProductDetailMiddleware extends ContextMiddleware {
  constructor(db, ctx, { id }) {
    super();
    this.db = db;
    this.ctx = ctx;
    this.id = id;
  }
  exec = async () => {
    const { db, ctx, id } = this;
    if (id) {
      const { query, args } = dbProducts.selectQuery({
        args: { id },
        limit: 1,
      });
      const response = await this.requestSqlContext({ query, args }, db, ctx);
      if (
        response.state == RequestState.fulfilled &&
        response.body?.length > 0
      ) {
        return this.makeResponse(response.state, response.body[0]);
      }
    }
    return this.makeResponse(RequestState.error, "Unable to find product");
  };
}

export class RequestProductNewId extends ContextMiddleware {
  constructor(db, ctx, { random = false }) {
    super();
    this.db = db;
    this.ctx = ctx;
    this.random = random;
  }
  exec = async () => {
    const { db, ctx, random } = this;
    const { query, args } = dbProducts.selectQuery({
      orderBy: "id",
      desc: true,
      limit: 1,
    });
    const response = await this.requestSqlContext({ query, args }, db, ctx);
    if (response.state == RequestState.fulfilled) {
      const latestProductId = response?.body?.[0]?.id || 0;
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
