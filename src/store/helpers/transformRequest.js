import { RequestState } from "../../enums";

export default transformRequest = (result, empty) => {
  if (result && typeof result === "object" && result.hasOwnProperty("state")) {
    if (result.state === RequestState.fulfilled) {
      return {
        state: result.state,
        body: result?.body !== undefined ? result.body : empty,
      };
    }
    if (result.state === RequestState.error) {
      return {
        state: result.state,
        ...(empty !== undefined ? { body: empty } : {}),
        error: result.error,
      };
    }
  }
  console.warn(
    "store/helpers/transform/request",
    "Unable to transform, result etheir empty or not valid"
  );
};
