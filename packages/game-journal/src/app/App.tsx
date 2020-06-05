import React from 'react';
import { Provider } from 'react-redux';
import { CSSReset, ThemeProvider, Box } from '@chakra-ui/core';
import { theme } from './theme/theme';
import { Header } from './layout/Header';
import { rootStore } from './store/rootStore';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Provider store={rootStore}>
        <BrowserRouter>
          <Box bg={'teal.700'} height="100vh" width="100vw">
            <Header />
            <Router />
          </Box>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
