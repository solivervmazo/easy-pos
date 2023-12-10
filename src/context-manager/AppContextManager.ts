import type {
  ContextMiddlewarePipelineCallback,
  ContextMiddlewarePipelineNextCallback,
  ContextMiddlewarePipelineTuple,
  ContextRequestMiddleware,
  ContextResponseError,
  ContextResponseSucess,
} from "./types/AppContextManager.types";
import {
  checkIfPipelineKeysUnique,
  checkIfPipelineNoKeyExists,
} from "./helpers";
import { RequestState } from "./enums/RequestState";

/**
 * Type guard function to check if the next value represents a "break" in the middleware pipeline.
 * @param next - The value to check.
 * @returns A boolean indicating whether the next value represents a "break" in the pipeline.
 */
function nextOrBreak(next: string | boolean): next is boolean {
  return typeof next === "boolean" ? next : false;
}

/**
 * Type guard function to check if the next value represents a "jump" to a specific middleware key in the pipeline.
 * @param next - The value to check.
 * @param key - The middleware key to compare with the next value.
 * @returns A boolean indicating whether the next value represents a "jump" to a specific key.
 */
function nextOrJump(next: string | boolean, key: string): next is string {
  return typeof next === "string" && next === key;
}

/**
 * Type guard function to check if the next value represents a "call" to a callback function in the pipeline.
 * @param next - The value to check.
 * @returns A boolean indicating whether the next value represents a "call" to a callback function.
 */
function nextOrCall(
  next: ContextMiddlewarePipelineTuple[2]
): next is ContextMiddlewarePipelineNextCallback {
  return typeof next === "function";
}

/**
 * Executes a series of middleware in a pipeline fashion, handling break, jump, and callback scenarios.
 * @param middlewares - An array of tuples representing middleware configurations in the pipeline.
 * @throws Will throw an error if keys are not unique in the middleware configurations.
 * @see ContextMiddlewarePipelineTuple
 * @returns Key value pair of each middleware responses
 * @example
 * //Example usage:
 * await makeContextRequests([\n
 *   'uniqueKey',
 *   new MyContextMiddleware(),
 *   (responses) => {
 *      return true; // true to proceed | "stringKey" to jump to next middleware | false to break pipeline
 *   }
 * ]);
 *
 * //Example usage:
 * // using ContextMiddlewarePipelineCallback
 * await makeContextRequests([\n
 *   'uniqueKey',
 *    (payload) => {
 *       return new MyContextMiddleware(payload),
 *    }
 *   (responses) => {
 *      return true; // true to proceed | "stringKey" to jump to next middleware | false to break pipeline
 *   }
 * ]);
 *
 * //Example response
 * //Success response
 * {"uniqueKey": {"body": [[Object]], "state": "FULFILLED"}}
 *
 * //Error response
 * {"uniqueKey": {"error": "Something went wrong", "state": "ERROR"}}
 */
export async function makeContextRequests(
  ...middlewares: [ContextMiddlewarePipelineTuple]
): Promise<{
  [key: string]: ContextResponseSucess | ContextResponseError;
}> {
  // Check if keys are unique in the middleware configurations
  checkIfPipelineKeysUnique(middlewares);

  // Object to store responses from each middleware in the pipeline
  let pipelineResponses: {
    [key: string]: ContextResponseSucess | ContextResponseError;
  } = {};

  // Variable to control pipeline breaks or jumps
  let breakOrJumpPipeline: boolean | string = true;

  // Iterate through each middleware in the pipeline
  for (const [key, middleware, next] of middlewares) {
    // Check if a break or jump condition is met
    if (
      nextOrBreak(breakOrJumpPipeline) ||
      nextOrJump(breakOrJumpPipeline, key)
    ) {
      // Execute the middleware and store the response
      let response: ContextResponseSucess | ContextResponseError;
      if (typeof middleware === "function") {
        response = await (<ContextMiddlewarePipelineCallback>middleware)(
          pipelineResponses
        ).exec();
      } else {
        response = await (<ContextRequestMiddleware>middleware).exec();
      }

      pipelineResponses = {
        ...pipelineResponses,
        [key]: response,
      };

      // Check if a callback should be invoked on error
      if (next && response.state === RequestState.error) {
        breakOrJumpPipeline = true;
      }

      // Check if a callback function should be called
      if (nextOrCall(next)) {
        breakOrJumpPipeline = (<ContextMiddlewarePipelineNextCallback>next)(
          pipelineResponses
        );
      } else {
        // Handle cases where the next value is a string (jump) or another value (continue)
        breakOrJumpPipeline =
          typeof next === "string"
            ? checkIfPipelineNoKeyExists(middlewares, next) || next
            : next;
      }
    }
  }

  return pipelineResponses;
}
