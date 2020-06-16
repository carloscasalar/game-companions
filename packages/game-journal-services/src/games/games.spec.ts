import { LambdaContext, LambdaEvent, LambdaResponse } from '../netlify/types';
import { handler } from './games';

describe('/src/games/games', () => {
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
    const context: LambdaContext = {
      headers: {},
      isBase64Encoded: true,
      statusCode: 200,
      body: '',
    };
    response = await handler(event, context);
  });

  it('should return the games list', () => {
    expect(response).toEqual({
      body:
        '{"games":[{"id":"nms","name":"No Man\'s Sky","features":["places"]}]}',
      headers: {
        'Content-Type': 'application/json',
      },
      isBase64Encoded: false,
      statusCode: 200,
    });
  });
});
