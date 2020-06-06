import React, { useContext } from 'react';
import { Icon, Stack, Button } from '@chakra-ui/core';
import { AuthContext } from '../features/auth/authContext';

export const Menu = () => {
  const auth = useContext(AuthContext);
  console.log(auth.user);
  return (
    <Stack
      justifyContent="flex-end"
      alignItems="flex-end"
      color="teal.50"
      p={2}
      fontSize="md"
      fontFamily="body"
    >
      {!auth.isAuthenticated && (
        <Button data-qa="login-link" onClick={auth.login}>
          Login <Icon name="external-link" mx="2" />
        </Button>
      )}
      {auth.isAuthenticated && (
        <Button data-qa="login-link" onClick={auth.logout}>
          Logout <Icon name="external-link" mx="2" />
        </Button>
      )}
    </Stack>
  );
};
