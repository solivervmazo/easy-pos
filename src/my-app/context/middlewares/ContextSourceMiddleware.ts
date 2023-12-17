import { ContextMiddleware } from "../../../context-manager";
import { RequestState } from "../../../enums";
export class ContextSourceMiddleware extends ContextMiddleware<{
  source: string;
}> {
  constructor() {
    super();
  }
  exec = async () => {
    return this.makeResponse(RequestState.fulfilled, { source: "SQLite" });
  };
}
