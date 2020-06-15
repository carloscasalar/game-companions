import { LambdaHandler, WithHttpMethodHandler } from '../netlify/types';
import { getController } from '../netlify/controller';

export type Game = {
  id: string;
  name: string;
};

export type GameResponse = {
  games: Game[];
};

const getGames: WithHttpMethodHandler<'GET', GameResponse> = {
  async get() {
    return {
      games: [
        {
          id: 'nms',
          name: "No Man's Sky",
        },
      ],
    };
  },
};

const gameController = getController(getGames);

export const handler: LambdaHandler = (...args) =>
  gameController.handler(...args);
