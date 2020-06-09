import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { NotFound } from './fallbacks/NotFound';
import { PlacesIndex } from '../features/places/PlacesIndex';
import { Box } from '@chakra-ui/core';
import { PrivateRoute } from '../features/auth/privateRoute/PrivateRoute';

export const Router = () => (
  <Switch>
    <Route path="/" exact={true}>
      <Box>Game Journal</Box>
    </Route>
    <PrivateRoute path="/places" component={PlacesIndex} />
    <Route path="*">
      <NotFound />
    </Route>
  </Switch>
);
