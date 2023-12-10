import { selectProductsQuery } from "../../../db/products";
import { RequestState } from "../../../enums";
import { ContextMiddleware } from "../../../context-manager";
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
      const { query, args } = selectProductsQuery({
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
