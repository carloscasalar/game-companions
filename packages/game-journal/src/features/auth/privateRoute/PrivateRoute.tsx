import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Route } from 'react-router-dom';
import { useAuth } from '../useAuth';
import { RouteProps } from 'react-router';
import { NotVerified } from './NotVerified';

export type PrivateRouteProps = RouteProps;

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = (
  routeProps: PropsWithChildren<PrivateRouteProps>
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { component, ...otherProps } = routeProps;
  const { isAuthenticated, user, login } = useAuth();

  if (!isAuthenticated || !user) {
    login();
  }
  return user?.isVerified ? (
    <Route {...routeProps} />
  ) : (
    <Route {...otherProps} component={NotVerified} />
  );
};
