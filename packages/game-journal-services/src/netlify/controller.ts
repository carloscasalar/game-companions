import {
  HttpMethod,
  HttpMethodHandlerName,
  LambdaController,
  LambdaEvent,
  LambdaResponse,
  MethodHandlerParams,
  WithHttpMethodHandler,
} from './types';

type ErrorBody = {
  error: string;
  detail?: unknown;
};

const toResponse = <TBody = undefined>(
  statusCode: number,
  body?: TBody
): LambdaResponse => ({
  isBase64Encoded: false,
  statusCode,
  body: body ? JSON.stringify(body) : '',
  headers: { 'Content-Type': 'application/json' },
});

const httpMethodsAndHandlerNames: {
  [key in HttpMethod]: HttpMethodHandlerName<key>;
} = {
  GET: 'get',
  CONNECT: 'connect',
  DELETE: 'destroy',
  HEAD: 'head',
  OPTIONS: 'options',
  PATCH: 'patch',
  POST: 'post',
  PUT: 'put',
  TRACE: 'trace',
} as const;

interface WithIsNotAllowed {
  isNotAllowed: (httpMethod: HttpMethod) => boolean;
}

const controller: LambdaController & WithIsNotAllowed = {
  isNotAllowed(httpMethod: HttpMethod): boolean {
    return !this[httpMethodsAndHandlerNames[httpMethod]];
  },
  async handler({
    httpMethod,
    body: plainRequestBody,
    headers,
    queryStringParameters,
  }: LambdaEvent): Promise<LambdaResponse> {
    if (this.isNotAllowed(httpMethod)) {
      return toResponse<ErrorBody>(405, {
        error: 'Method Not Allowed',
        detail: {
          method: httpMethod,
          keys: Object.keys(this),
        },
      });
    }

    let requestBody: undefined | unknown;
    try {
      requestBody = !!plainRequestBody
        ? JSON.stringify(plainRequestBody)
        : undefined;
    } catch (e) {
      return toResponse<ErrorBody>(422, {
        error: 'Unprocessable entity',
        detail: e.message,
      });
    }

    const handlerName = httpMethodsAndHandlerNames[httpMethod];

    const handlerMethod: (
      params: MethodHandlerParams<unknown>
    ) => Promise<unknown> = this[handlerName];

    try {
      const responseBody: unknown = await handlerMethod({
        query: queryStringParameters,
        headers,
        body: requestBody,
      });

      const statusCode = !!responseBody ? 200 : 204;
      return toResponse<unknown>(statusCode, responseBody);
    } catch (e) {
      console.error('Unexpected Error while handling request', {
        queryStringParameters,
        headers,
        requestBody,
      });
      return toResponse<ErrorBody>(500, {
        error: 'Internal server error',
      });
    }
  },
};

export const getController = (
  withHandler: WithHttpMethodHandler<HttpMethod, unknown>
): LambdaController => ({
  ...controller,
  ...withHandler,
});
