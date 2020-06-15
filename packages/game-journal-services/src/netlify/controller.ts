import {
  HttpMethod,
  HttpMethodHandlerName,
  LambdaController,
  LambdaEvent,
  LambdaResponse,
  MethodHandlerParams,
} from './types';

const httpMethodsAndHandlerNames: {
  method: HttpMethod;
  handlerName: HttpMethodHandlerName<HttpMethod>;
}[] = [
  { method: 'GET', handlerName: 'get' },
  { method: 'HEAD', handlerName: 'head' },
  { method: 'POST', handlerName: 'post' },
  { method: 'PUT', handlerName: 'put' },
  { method: 'DELETE', handlerName: 'destroy' },
  { method: 'CONNECT', handlerName: 'connect' },
  { method: 'OPTIONS', handlerName: 'options' },
  { method: 'TRACE', handlerName: 'trace' },
  { method: 'PATCH', handlerName: 'patch' },
];

const defaultHandlers =

const getMethodHandlerName = (httpMethod: LambdaEvent['httpMethod']) =>
  httpMethod === 'DELETE' ? 'destroy' : `${httpMethod}`.toLowerCase();

export const controller: LambdaController = {
  async handler({
    httpMethod,
    body: plainBody,
    headers,
    queryStringParameters,
  }: LambdaEvent): Promise<LambdaResponse> {
    const handlerName = getMethodHandlerName(httpMethod);

    const handlerMethod: (
      params: MethodHandlerParams<unknown>
    ) => Promise<unknown> = this[handlerName];

    if (!handlerMethod) {
      return {
        isBase64Encoded: false,
        statusCode: 405,
        body: JSON.stringify({
          error: `Method Not Allowed: ${httpMethod}`,
        }),
        headers: { 'Content-Type': 'application/json' },
      };
    }

    let requestBody: undefined | unknown;
    try {
      requestBody = !!plainBody ? JSON.stringify(plainBody) : undefined;
    } catch (e) {
      return {
        isBase64Encoded: false,
        statusCode: 422,
        body: JSON.stringify({
          error: 'Unprocessable entity',
          detail: e.message,
        }),
        headers: { 'Content-Type': 'application/json' },
      };
    }

    const responseBody: unknown = await handlerMethod({
      query: queryStringParameters,
      headers,
      body: requestBody,
    });

    return {
      isBase64Encoded: false,
      statusCode: !!responseBody ? 200 : 204,
      headers: { 'Content-Type': 'application/json' },
      body: !!responseBody ? JSON.stringify(responseBody) : '',
    };
  },
};
