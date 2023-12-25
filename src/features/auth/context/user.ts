import { SQLTransactionAsync } from "expo-sqlite";
import { UserTransformedProps } from "./db/user";
import {
  ContextResponseEither,
  RequestState,
  makeContextRequests,
} from "../../../context-manager";
import { ContextSourceMiddleware } from "../../../my-app";

export const requestInsertProduct = async (
  ctx: SQLTransactionAsync,
  { payload }: { payload: UserTransformedProps }
) => {
  let userResponse: ContextResponseEither<UserTransformedProps>;
  await makeContextRequests([
    "source",
    new ContextSourceMiddleware(),
    ({}) => {
      userResponse = {
        state: RequestState.fulfilled,
        body: {
          id: 0,
          email: "beta@easy-pos",
          username: "admin@beta",
          roleId: 1,
          token: "xHkjILjuikokUI",
        },
      };
      return true;
    },
  ]);
  return userResponse;
};
