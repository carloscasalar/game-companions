import { LambdaContext, LambdaEvent, LambdaResponse } from '../netlify/types';
import { handler } from './features';

describe('/src/features/features', () => {
  let response: LambdaResponse;
  beforeEach(async () => {
    const event: LambdaEvent = {
      httpMethod: 'GET',
      queryStringParameters: {},
      isBase64Encoded: false,
      headers: {},
      path: 'api/features',
      body: '',
    };
    const context: LambdaContext = {
      headers: {},
      isBase64Encoded: false,
      statusCode: undefined,
      body: undefined,
    };
    response = await handler(event, context);
  });

  it('should return the feature list', () => {
    expect(response).toEqual({
      body:
        '{"features":[{"id":"places","name":"places","description":"It allows to maintain a list of places and locations in the game"}]}',
      headers: {
        'Content-Type': 'application/json',
      },
      isBase64Encoded: false,
      statusCode: 200,
    });
  });
});
