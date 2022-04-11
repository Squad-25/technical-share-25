import './App.css';
import { Typography } from '@mui/material';
import BottomNavigationComponent from './components/BottomNavigationComponent';


function App() {
  return (
    <>
      <div className="App">
        <Typography variant="h1" component="h1">
          Olá, eu sou App

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