import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/router';
import CssBaseline from '@mui/material/CssBaseline'
import BottomNavigationComponent from './components/BottomNavigationComponent';
import { ThemeProvider } from '@emotion/react';
import theme from './constants/theme' 

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline>
      <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Router />
      <p></p>
      <BottomNavigationComponent />
    </BrowserRouter>
      </ThemeProvider>
    </CssBaseline>
  </React.StrictMode>,
  document.getElementById('root')
);