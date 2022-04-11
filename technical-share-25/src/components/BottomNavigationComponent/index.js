import { useEffect, useState } from "react";

import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import { Home, Person, Leaderboard } from "@mui/icons-material";


export default function BottomNavigationComponent() {
    const [value, setValue] = useState('consultar');

    const active = value;


    /* 
        * Utilizar classNames para estilizar componente utilizando media queries
        * Por enquanto apliquei width=360 na prop sx do BottomNavigation para simular mobile
    */

    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, value) => {
                setValue(value);
            }}
            sx={{ width: 360, backgroundColor: '#404099' }}
            className=""
        >
            <BottomNavigationAction
                label="Consultar"
                value="consultar"
                icon={<Home />}
                sx={{
                    backgroundColor: active === 'consultar' && '#36367D', color: '#ffffff', '&.MuiBottomNavigationAction-root.Mui-selected': {
                        color: '#ffffff',
                    }
                }}
            />
            <BottomNavigationAction
                label="Perfil"
                value="perfil"
                icon={<Person />}
                sx={{
                    backgroundColor: active === 'perfil' && '#36367D', color: '#ffffff', '&.MuiBottomNavigationAction-root.Mui-selected': {
                        color: '#ffffff',
                    }
                }}
            />
            <BottomNavigationAction
                label="Rank"
                value="rank"
                icon={<Leaderboard />}
                sx={{
                    backgroundColor: active === 'rank' && '#36367D', color: '#ffffff', '&.MuiBottomNavigationAction-root.Mui-selected': {
                        color: '#ffffff',
                    }
                }}
            />

        </BottomNavigation>
    )
}