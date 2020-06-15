import {
  LambdaContext,
  LambdaController,
  LambdaEvent,
  LambdaResponse,
  WithHttpMethodHandler,
} from './types';
import { controller, getController } from './controller';

describe('netlify/controller', () => {
  describe('a controller with only GET handler', () => {
    let controllerWithGet: LambdaController;
    beforeEach(() => {
      const getHandler: WithHttpMethodHandler<'GET', { aText: string }> = {
        get() {
          return Promise.resolve({ aText: 'a text' });
        },
      };

      controllerWithGet = getController(getHandler);
    });

    describe('when handle a GET request', () => {
      let response: LambdaResponse;
      beforeEach(async () => {
        const event: LambdaEvent = {
          httpMethod: 'GET',
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

      it('should respond OK with stringified body', () => {
        expect(response).toEqual({
          body: '{"aText":"a text"}',
          headers: {
            'Content-Type': 'application/json',
          },
          isBase64Encoded: false,
          statusCode: 200,
        });
      });
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
