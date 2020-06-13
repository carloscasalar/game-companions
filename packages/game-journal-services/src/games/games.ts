import { LambdaHandler } from '../netlify/types';

export type Game = {
  id: string;
  name: string;
};

export const handler: LambdaHandler<{ games: Game[] }> = async () => ({
  statusCode: 200,
  body: {
    games: [
      {
        id: 'nms',
        name: "No Man's Sky",
      },
    ],
  },
});
