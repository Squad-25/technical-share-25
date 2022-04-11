import { Link } from 'react-router-dom';

import './App.css';
import { Typography } from '@mui/material';
import BottomNavigationComponent from './components/BottomNavigationComponent';
import Loading from './assets/loading';


function App() {
  return (
    <>
      <div className="App">
        <Typography variant="h1" component="h1">
          Olá, eu sou App

        <Loading/>

        </Typography>

        <BottomNavigationComponent />
      </div>
    </>
  );
}

export default App;


/* 

<Link to="/">
              <Button className="" variant=''>
                <Home />
                Consultar
              </Button>
            </Link>
*/