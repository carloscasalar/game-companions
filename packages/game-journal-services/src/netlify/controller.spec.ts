import {
  LambdaContext,
  LambdaController,
  LambdaEvent,
  LambdaResponse,
  WithHttpMethodHandler,
} from './types';
import { controller } from './controller';
//
// const allMethods: HttpMethod[] = [
//   'GET',
//   'HEAD',
//   'POST',
//   'PUT',
//   'DELETE',
//   'CONNECT',
//   'OPTIONS',
//   'TRACE',
//   'PATCH',
// ];
//
// const allMethodsBut = (exceptMethod: HttpMethod): HttpMethod[] =>
//   allMethods.filter((m) => m !== exceptMethod);

describe('netlify/controller', () => {
  describe('a controller with only GET handler', () => {
    let controllerWithGet: LambdaController;
    beforeEach(() => {
      const getHandler: WithHttpMethodHandler<'GET', string> = {
        get() {
          return Promise.resolve('ok response');
        },
      };

      controllerWithGet = {
        ...controller,
        ...getHandler,
      };
    });

    describe.each`
      method
      ${'HEAD'}
      ${'POST'}
      ${'PUT'}
      ${'DELETE'}
      ${'CONNECT'}
      ${'OPTIONS'}
      ${'TRACE'}
      ${'PATCH'}
    `('when handle a $method request', ({ method }) => {
      let response: LambdaResponse;
      beforeEach(async () => {
        const event: LambdaEvent = {
          httpMethod: method,
          queryStringParameters: {},
          isBase64Encoded: false,
          headers: {},
          path: 'a/path',
          body: '',
        };
        const lambdaContext: LambdaContext = {
          headers: {},
          isBase64Encoded: true,
          statusCode: 200,
          body: '',
        };
        response = await controllerWithGet.handler(event, lambdaContext);
      });

      it('should respond with method not allowed', () => {
        expect(response.statusCode).toEqual(405);
      });
    });
  });
});
