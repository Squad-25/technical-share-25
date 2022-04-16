import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import LogoCertinho from '../../assets/logo-certinho.svg';
import { Home, Person, Leaderboard } from "@mui/icons-material";
import { useLocation, useNavigate } from 'react-router-dom';

const pages = ['Home', 'Perfil', 'Ranking'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const TopBar = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const path = location.pathname

    return (
        <AppBar position="fixed" sx={{ position: 'absolute', top: 0, width: '100wv', display: { mobile: 'none', tablet: 'flex' } }}>
            <Container>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { tablet: 'flex' } }}
                    >
                        <img src={LogoCertinho} alt="Technical Share" />
                    </Typography>

                    <Box sx={{ display: { tablet: 'flex' }, flexGrow: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <Button
                            /* onClick={navigate('/home')} */
                            sx={{ my: 2, color: 'white', display: 'inline-block' }}
                        >
                            <Home />
                            Home
                        </Button>

                        <Button
                            /* onClick={navigate('/profile')} */
                            sx={{ my: 2, color: 'white', display: 'inline-block' }}
                        >
                            <Person />
                            Perfil
                        </Button>

                        <Button
                            /* onClick={navigate('/rank')} */
                            sx={{ my: 2, color: 'white', display: 'inline-block' }}
                        >
                            <Leaderboard />
                            Ranking
                        </Button>

                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default TopBar;