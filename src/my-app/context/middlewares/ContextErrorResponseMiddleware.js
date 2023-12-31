import { ContextMiddleware, RequestState } from "../../../context-manager";
export class ContextErrorResponseMiddleware extends ContextMiddleware {
  constructor(error) {
    super();
    this.error = error;
  }
  exec = async () => {
    return this.makeResponse(RequestState.error, this.error);
  };
}
