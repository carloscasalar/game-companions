import React from 'react';
import { Icon, Link, Stack } from '@chakra-ui/core';

export const Menu = () => {
  return (
    <Stack
      justifyContent="flex-end"
      alignItems="flex-end"
      color="teal.50"
      p={2}
      fontSize="md"
      fontFamily="body"
    >
      <Link data-qa="login-link">
        Login <Icon name="external-link" mx="2" />
      </Link>
    </Stack>
  );
};
