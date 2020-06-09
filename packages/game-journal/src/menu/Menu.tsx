import React from 'react';
import { Icon, Stack, Button, Divider } from '@chakra-ui/core';
import { useAuth } from '../features/auth/useAuth';
import { Link as ReactRouterLink } from 'react-router-dom';

export const Menu = () => {
  const auth = useAuth();
  console.log(auth.user);
  return (
    <Stack
      justifyContent="flex-end"
      alignItems="flex-end"
      bg="teal.800"
      color="teal.50"
      p={2}
      fontSize="md"
      fontFamily="body"
      direction="row"
    >
      <ReactRouterLink to="/places">Places</ReactRouterLink>
      {!auth.isAuthenticated && (
        <Button data-qa="login-link" onClick={auth.login}>
          Login <Icon name="external-link" mx="2" />
        </Button>
      )}
      <Divider />
      {auth.isAuthenticated && (
        <Button data-qa="login-link" onClick={auth.logout}>
          Logout <Icon name="external-link" mx="2" />
        </Button>
      )}
    </Stack>
  );
};
