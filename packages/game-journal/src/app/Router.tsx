import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { NotFound } from './fallbacks/NotFound';
import { PlacesIndex } from '../features/places/PlacesIndex';

export const Router = () => (
  <Switch>
    <Route path="/" exact={true}>
      <Redirect to="/places" />
    </Route>
    <Route path="/places" component={PlacesIndex} />
    <Route path="*">
      <NotFound />
    </Route>
  </Switch>
);
