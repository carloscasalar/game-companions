import React, { createContext, FC, useEffect, useState } from 'react';
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';

export type User = {
  id: string;
  name: string;
};

interface AuthContextModel {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextModel>({
  isAuthenticated: false,
  isLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
});

export interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider: FC = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const [authClient, setAuthClient] = useState<Auth0Client>();

  useEffect(() => {
    initAuth()
      .then(() => {
        console.log('auth init finished');
      })
      .catch((err) =>
        console.error('unexpected error while authenticating', err)
      );

    async function initAuth() {
      const client = await createAuth0Client({
        domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
        client_id: process.env.REACT_APP_AUTH0_CLIENT as string,
        redirect_uri: window.location.origin,
      });

      setAuthClient(client);

      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        await client.handleRedirectCallback();
        // window.location.replace(window.location.pathname);
      }

      const authenticated = await client.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const authUser = await client.getUser();
        setUser(authUser);
        console.log('the user', authUser);
      } else {
        console.log('not authenticated :(');
      }

      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login: () => {
          authClient?.loginWithRedirect();
        },
        logout: () => {
          authClient?.logout();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
