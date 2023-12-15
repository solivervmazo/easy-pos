import { ContextMiddleware, RequestState } from "../../context-manager/index";
export class ContextSourceMiddleware extends ContextMiddleware {
  exec = async () => {
    return this.makeResponse(RequestState.fulfilled, { source: "SQLite" });
  };
}
