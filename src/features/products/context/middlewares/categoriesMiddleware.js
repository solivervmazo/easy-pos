import { dbProductCategories } from "../db/categories";
import { RequestState } from "../../../../enums";
import { ContextMiddleware } from "../../../../context-manager";
import { generateStringId } from "../../../../utils";

export class RequestProductCategoryListMiddleware extends ContextMiddleware {
  constructor(db, ctx, { orderBy = "id", desc = true }) {
    super();
    this.db = db;
    this.ctx = ctx;
    this.orderBy = orderBy;
    this.desc = desc;
  }
  exec = async () => {
    const { db, ctx, orderBy, desc } = this;
    const { query, args } = dbProductCategories.selectQuery({ orderBy, desc });
    return await this.requestSqlContext({ query, args }, db, ctx);
  };
}

export class RequestProductCategoryDetailMiddleware extends ContextMiddleware {
  constructor(db, ctx, { id }) {
    super();
    this.db = db;
    this.ctx = ctx;
    this.id = id;
  }
  exec = async () => {
    const { db, ctx, id } = this;
    if (id) {
      const { query, args } = dbProductCategories.selectQuery({
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
    return this.makeResponse(RequestState.error, "Unable to find category");
  };
}

export class InsertProductCategoryMiddleware extends ContextMiddleware {
  constructor(db, ctx, { payload }) {
    super();
    this.db = db;
    this.ctx = ctx;
    this.payload = payload;
  }
  exec = async () => {
    const { db, ctx, payload } = this;
    const { query, args } = dbProductCategories.insertQuery(payload);
    return await this.requestSqlContext({ query, args }, db, ctx);
  };
}

export class RequestUpdateProductCategoryMiddleware extends ContextMiddleware {
  constructor(db, ctx, { payload, oldCategory }) {
    super();
    this.db = db;
    this.ctx = ctx;
    this.payload = payload;
    this.oldCategory = oldCategory;
  }
  exec = async () => {
    const { db, ctx, payload, oldCategory } = this;
    const { query, args } = dbProductCategories.updateQuery(payload);
    const updateRequest = await this.requestSqlContext(
      { query, args },
      db,
      ctx
    );
    if (updateRequest.state === RequestState.fulfilled) {
      const { query: updatedQuery, args: updatedArgs } =
        dbProductCategories.selectQuery({
          args: { id: payload.id },
          limit: 1,
        });

      const requestUpdatedCategory = await this.requestSqlContext(
        { query: updatedQuery, args: updatedArgs },
        db,
        ctx
      );
      if (requestUpdatedCategory.state === RequestState.fulfilled) {
        const updatedCategory = requestUpdatedCategory.body[0];
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
            db,
            ctx
          );
          if (updatedCategoryTree.state === RequestState.error) {
            throw Error(
              updatedCategoryTree?.error ?? "Unable to update category tree"
            );
          }
        }
        return this.makeResponse(
          RequestState.fulfilled,
          requestUpdatedCategory.body
        );
      }
    }
    return this.makeResponse(
      updateRequest.state,
      updateRequest.error ?? "Unable to update category"
    );
  };
}

export class RequestProductCategoryNewId extends ContextMiddleware {
  constructor(db, ctx, { random = false }) {
    super();
    this.db = db;
    this.ctx = ctx;
    this.random = random;
  }
  exec = async () => {
    const { db, ctx, random } = this;
    const { query, args } = dbProductCategories.selectQuery({
      orderBy: "id",
      desc: true,
      limit: 1,
    });
    const response = await this.requestSqlContext({ query, args }, db, ctx);
    if (response.state == RequestState.fulfilled) {
      const latestCategoryId = response?.body?.[0]?.id || 0;
      return this.makeResponse(
        response.state,
        generateStringId(latestCategoryId, random)
      );
    }
    return this.makeResponse(
      RequestState.error,
      "Unable to generate category id"
    );
  };
}
