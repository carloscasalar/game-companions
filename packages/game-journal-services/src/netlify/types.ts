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

export interface LambdaEvent {
  path: string;
  httpMethod:
    | 'get'
    | 'head'
    | 'post'
    | 'put'
    | 'delete'
    | 'connect'
    | 'options'
    | 'trace'
    | 'patch';
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
