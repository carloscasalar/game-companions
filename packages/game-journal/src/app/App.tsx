import React from 'react';
import { Provider } from 'react-redux';
import { CSSReset, ThemeProvider, Box } from '@chakra-ui/core';
import { theme } from './theme/theme';
import { Header } from './layout/Header';
import { rootStore } from './store/rootStore';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <Provider store={rootStore}>
                <Box bg={'teal.700'} height="100vh" width="100vw">
                    <Header />
                </Box>
            </Provider>
        </ThemeProvider>
    );
};

export default App;
