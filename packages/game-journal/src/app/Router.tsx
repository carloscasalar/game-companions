import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { NotFound } from './fallbacks/NotFound';
import { PlacesIndex } from '../features/places/PlacesIndex';
import { Box } from '@chakra-ui/core';

export const Router = () => (
  <Switch>
    <Route path="/" exact={true}>
      {/*<Redirect to="/places" />*/}
      <Box>Game Journal</Box>
    </Route>
    <Route path="/places" component={PlacesIndex} />
    <Route path="*">
      <NotFound />
    </Route>
  </Switch>
);
