import { useState } from "react"
import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import { Home, Person, Leaderboard } from "@mui/icons-material"
import { useNavigate, useLocation } from "react-router-dom"

export default function BottomNavigationComponent() {
  const [value, setValue] = useState("consultar")

  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname

  const active = value

  const renderNav = () => {
    
    if (path !== '/' && path !== '/msuserterms')
    return (
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, value) => {
          setValue(value)
        }}
        sx={{
          position: "fixed",
          bottom: -1,
          width: "100vw",
          backgroundColor: "#404099",
        }}
        className=""
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<Home />}
          onClick={() => navigate("/")}
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
          onClick={() => navigate("/profile")}
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
          onClick={() => navigate("/rank")}
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

  return (
    <>{renderNav()}</>
  )
}
