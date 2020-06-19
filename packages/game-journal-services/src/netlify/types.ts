export interface LambdaResponse {
  statusCode: number;
  isBase64Encoded: boolean;
  headers?: Record<string, string>;
  body: string;
}
export type Callback = (error: Error | null, response: LambdaResponse) => void;

export interface LambdaContext {
  isBase64Encoded: boolean;
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

export type HttpMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

export type HttpMethodHandlerName<
  Method extends HttpMethod
> = Method extends 'GET'
  ? 'get'
  : Method extends 'HEAD'
  ? 'head'
  : Method extends 'POST'
  ? 'post'
  : Method extends 'PUT'
  ? 'put'
  : Method extends 'DELETE'
  ? 'destroy'
  : Method extends 'CONNECT'
  ? 'connect'
  : Method extends 'OPTIONS'
  ? 'options'
  : Method extends 'TRACE'
  ? 'trace'
  : 'patch';

export interface LambdaEvent {
  path: string;
  httpMethod: HttpMethod;
  headers: Record<string, string>;
  queryStringParameters: Record<string, string>;
  body: string;
  isBase64Encoded: boolean;
}

export type LambdaHandlerWithCallback = (
  event: LambdaEvent,
  context: LambdaContext,
  callback: Callback
) => void;

export type LambdaHandler = (
  event: LambdaEvent,
  context: LambdaContext
) => Promise<LambdaResponse>;

export interface LambdaController {
  handler: LambdaHandler;
}

export type MethodHandlerParams<
  TResponseBody,
  TQuery = Record<string, string>,
  THeaders = Record<string, string>,
  TRequestBody = Record<string, string>
> = {
  query: TQuery;
  headers: THeaders;
  body?: TResponseBody;
};

export type MethodHandler<
  TResponseBody,
  TQuery = Record<string, string>,
  THeaders = Record<string, string>
> = (
  params: MethodHandlerParams<TResponseBody, TQuery, THeaders>
) => Promise<TResponseBody> | never;

export type WithHttpMethodHandler<
  THttpMethod extends HttpMethod,
  TResponseBody,
  TQuery = Record<string, string>,
  THeaders = Record<string, string>
> = {
  [key in HttpMethodHandlerName<THttpMethod>]: MethodHandler<
    TResponseBody,
    TQuery,
    THeaders
  >;
};
