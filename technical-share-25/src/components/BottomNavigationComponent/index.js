import { useState } from "react"

import { BottomNavigation, BottomNavigationAction } from "@mui/material"

import { Home, Person, Leaderboard } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { userID } from "../../services/urls"

export default function BottomNavigationComponent() {
  const [value, setValue] = useState("consultar")

  const active = value

  const navigate = useNavigate()

  /*
   * Utilizar classNames para estilizar componente utilizando media queries
   * Por enquanto apliquei width=360 na prop sx do BottomNavigation para simular mobile
   */

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, value) => {
        setValue(value)
      }}
      sx={{position: "fixed", bottom: -1, width: "100vw", backgroundColor: "#404099" }}
      className=""
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<Home />}
        onClick={() => navigate('/')}
        sx={{
          backgroundColor: active === "home" && "#36367D",
          color: "#ffffff",
          "&.MuiBottomNavigationAction-root.Mui-selected": {
            color: "#ffffff",
          },
        }}
      />
      <BottomNavigationAction
        label="Perfil"
        value="perfil"
        icon={<Person />}
        onClick={() => navigate('/profile/'+userID)}
        sx={{
          backgroundColor: active === "perfil" && "#36367D",
          color: "#ffffff",
          "&.MuiBottomNavigationAction-root.Mui-selected": {
            color: "#ffffff",
          },
        }}
      />
      <BottomNavigationAction
        label="Ranking"
        value="ranking"
        icon={<Leaderboard />}
        onClick={() => navigate('/rank')}
        sx={{
          backgroundColor: active === "ranking" && "#36367D",
          color: "#ffffff",
          "&.MuiBottomNavigationAction-root.Mui-selected": {
            color: "#ffffff",
          },
        }}
      />
    </BottomNavigation>
  )
}
