import { LambdaHandler } from '../netlify/types';

export type Game = {
  id: string;
  name: string;
};

export const handler: LambdaHandler<string> = async () => ({
  statusCode: 200,
  body: JSON.stringify({
    games: [
      {
        id: 'nms',
        name: "No Man's Sky",
      },
    ],
  }),
});
