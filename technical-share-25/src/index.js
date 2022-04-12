import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import Router from './routes/router';
import CssBaseline from '@mui/material/CssBaseline'
import BottomNavigationComponent from './components/BottomNavigationComponent';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline>
    <BrowserRouter>
      <Router />
      <BottomNavigationComponent />
    </BrowserRouter>
    </CssBaseline>
  </React.StrictMode>,
  document.getElementById('root')
);