import { LambdaHandler, WithHttpMethodHandler } from '../netlify/types';
import { getController } from '../netlify/controller';

export type Feature = {
  id: string;
  name: string;
  description: string;
};

export type FeatureResponse = {
  features: Feature[];
};

const getFeatures: WithHttpMethodHandler<'GET', FeatureResponse> = {
  async get() {
    return {
      features: [
        {
          id: 'places',
          name: 'places',
          description:
            'It allows to maintain a list of places and locations in the game',
        },
      ],
    };
  },
};

const featureController = getController(getFeatures);

export const handler: LambdaHandler = (...args) =>
  featureController.handler(...args);
