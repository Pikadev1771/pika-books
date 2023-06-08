import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { GlobalStyle } from './styles/global-styles';
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import { StyledEngineProvider } from '@mui/styled-engine';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StyledEngineProvider>
);
