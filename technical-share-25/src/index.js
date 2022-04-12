import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@mui/material';

import { BrowserRouter } from 'react-router-dom';
import Router from './routes/router';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    <CssBaseline />
  </React.StrictMode>,
  document.getElementById('root')
);