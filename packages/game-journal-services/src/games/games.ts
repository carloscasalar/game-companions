import {
  LambdaController,
  LambdaHandler,
  WithHttpMethodHandler,
} from '../netlify/types';
import { controller } from '../netlify/controller';

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

const gameController: LambdaController = {
  ...getGames,
  ...controller,
};

export const handler: LambdaHandler = gameController.handler;
