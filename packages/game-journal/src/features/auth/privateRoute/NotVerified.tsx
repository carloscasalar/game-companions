import React from 'react';
import { Box, Icon } from '@chakra-ui/core';

export const NotVerified = () => (
  <Box color="teal.50">
    <Icon name="warning" size="32px" color="red.500" /> You need to verify your
    user before proceed. Please, check your email.
  </Box>
);
