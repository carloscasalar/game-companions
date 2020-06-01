import React from 'react';
import { CSSReset, ThemeProvider, Box } from '@chakra-ui/core';
import { theme } from './theme/theme';
import { Header } from './layout/Header';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <Box bg={'teal.700'} height="100vh" width="100vw">
                <Header />
            </Box>
        </ThemeProvider>
    );
};

export default App;
