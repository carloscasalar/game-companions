import {
  LambdaController,
  LambdaEvent,
  LambdaHandler,
  LambdaResponse,
} from '../netlify/types';

export type Game = {
  id: string;
  name: string;
};

class GameController implements LambdaController {
  async handler(event: LambdaEvent): Promise<LambdaResponse> {
    if (event.httpMethod !== 'get') {
      return {
        isBase64Encoded: false,
        statusCode: 404,
        body: JSON.stringify({
          error: 'not found',
        }),
        headers: { 'Content-Type': 'application/json' },
      };
    }
    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        games: [
          {
            id: 'nms',
            name: "No Man's Sky",
          },
        ],
      }),
    };
  }
}

const controller = new GameController();

export const handler: LambdaHandler = controller.handler;
