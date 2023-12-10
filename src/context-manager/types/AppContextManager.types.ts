import { SQLiteDatabase, SQLTransactionAsync } from "expo-sqlite";
import { RequestState } from "../enums/RequestState";

export type ContextObj = {
  [key: string]: string | number | ContextObj;
};

export interface ContextResponder {}

/**
 * Represents the state of a response, including the overall state of the request.
 */
export type ContextResponseState = {
  state: RequestState;
};

/**
 * Represents the state of a response with a successful outcome.
 * It includes the general response state and a `body` property that holds the payload of a successful response.
 */
export type ContextResponseSucess = ContextResponseState & {
  body: ContextObj[];
};

/**
 * Represents the state of a response with an error outcome.
 * It includes the general response state, and an optional `error` property that captures an error message.
 */
export type ContextResponseError = ContextResponseState & {
  error?: string;
};

/**
 * Represents the response object of a middleware pipeline.
 * It includes a `response` property, where each key corresponds to a middleware key,
 * and the values are either successful responses or error responses from each middleware.
 * An optional `error` property can be used to capture a general error message for the entire pipeline.
 */
export interface ContextPipelineResponse {
  response: {
    [key: string]: ContextResponseSucess | ContextResponseError;
  };
  error?: string;
}

/**
 * Defines a callback function that can pass the pipeline response.
 * The callback receives a response object, where each key corresponds to a middleware key.
 *
 * @param response - The response object collected from the pipeline, with middleware keys as properties.
 * @returns Instatiated Middleware
 */
export interface ContextMiddlewarePipelineCallback {
  (response: ContextPipelineResponse["response"]): ContextRequestMiddleware;
}

/**
 * Defines a callback function that controls the execution of a middleware pipeline.
 * The callback receives a response object, where each key corresponds to a middleware key,
 * and returns a boolean or a string indicating the next middleware to execute.
 *
 * If the callback returns `true`, it allows the execution of subsequent middleware in the pipeline.
 * If the callback returns `false`, it restricts the execution of subsequent middleware in the pipeline.
 * If the callback returns a string, it specifies the key of the next middleware to execute in the pipeline.
 *
 * @param response - The response object collected from the pipeline, with middleware keys as properties.
 * @returns A boolean indicating whether the execution of the pipeline should be restricted,
 *          or a string specifying the key of the next middleware to execute.
 */
export interface ContextMiddlewarePipelineNextCallback {
  (response: ContextPipelineResponse["response"]): boolean | string;
}

/**
 * Represents a tuple used in a middleware pipeline configuration.
 * Each tuple consists of:
 *   1. string: The middleware key in the pipeline. Should be unique; otherwise, it will overwrite an existing key.
 *   2. ContextMiddleware: The middleware class to be added to the pipeline.
 *   3. (boolean | string | ContextMiddlewarePipelineNextCallback) | undefined:
 *        - If boolean:
 *          - `true`: Executes the middleware but allows the execution of subsequent middleware in the pipeline.
 *          - `false`: Executes the middleware and restricts the execution of subsequent middleware in the pipeline.
 *        - If string:
 *          - Specifies the key of the next middleware to execute in the pipeline.
 *        - If ContextMiddlewarePipelineNextCallback:
 *          - Provides a callback function that receives the response object and returns a boolean or a string.
 *          - If the callback returns `true`, it allows the execution of subsequent middleware in the pipeline.
 *          - If the callback returns `false`, it restricts the execution of subsequent middleware in the pipeline.
 *          - If the callback returns a string, it specifies the key of the next middleware to execute.
 * @example
 * //Example usage:
 * const pipelineTuple: ContextMiddlewarePipelineTuple = [
 *   'uniqueKey',
 *   new ContextMiddleware(),
 *   true // or provide a custom callback function that returns boolean or string
 * ];
 */
export type ContextMiddlewarePipelineTuple = [
  string,
  ContextRequestMiddleware | ContextMiddlewarePipelineCallback,
  (boolean | string | ContextMiddlewarePipelineNextCallback)?
];

// export type ContextMiddlewareSuccessCallback

export interface SqlRequestPayload {
  query: string;
  args: Array<string | number>;
}

export type SqlTransactionRequestArgs = {
  query: SqlRequestPayload["query"];
  args: SqlRequestPayload["args"];
};

export type SqlObjectRequestArgs = {
  db?: SQLiteDatabase | string;
  ctx?: SQLTransactionAsync;
};

export interface ContextRequestMiddleware {
  exec(): Promise<ContextResponseSucess | ContextResponseError>;
  //   success: ContextResponseSucess;
  //   error: ContextResponseError;
}
