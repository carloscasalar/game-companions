export interface Response<TBody> {
  statusCode: number;
  body: TBody;
}
export type Callback<TBody> = (
  error: Error | null,
  response: Response<TBody>
) => void;

export interface Context {
  isBase64Encoded: boolean;
  statusCode: number;
  headers: { [header: string]: string };
  body: string;
}

export interface Event {
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
  headers: { [header: string]: string };
  queryStringParameters: { [parameter: string]: string };
  body: string;
  isBase64Encoded: boolean;
}

export type LambdaHandlerWithCallback<TBody> = (
  event: Event,
  context: Context,
  callback: Callback<TBody>
) => void;

export type LambdaHandler<TBody> = (
  event: Event,
  context: Context
) => Promise<Response<TBody>>;
