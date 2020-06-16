import { LambdaHandler, WithHttpMethodHandler } from '../netlify/types';
import { getController } from '../netlify/controller';

export type Game = {
  id: string;
  name: string;
  features: string[];
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
          features: ['places'],
        },
      ],
    };
  },
};

const gameController = getController(getGames);

export const handler: LambdaHandler = (...args) =>
  gameController.handler(...args);
