import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styledComponents from "styled-components"
import logo from "../../assets/technicalshare-logo.svg"
import { Home, Person, Leaderboard } from "@mui/icons-material"
import LogoutIcon from "@mui/icons-material/ExitToApp"
import styled from "@emotion/styled"
import { Box } from "@mui/system"

const Container = styledComponents.div`
.header-bg {
  background-color: #404099;
  @media screen and (max-width: 704px) {
display: none;
  }
  margin-bottom: 16px;
}

.header {
  width: 100vw;
  display: flex;
  justify-content: space-around;
  gap: 20px;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  color: #FFFFFF;
}

#logo {
  width: 260px;
  cursor: pointer;
  @media screen and (min-width: 1840px){
    width: auto;
  }
}
 
.header-menu {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  list-style-type: none;
  @media screen and (max-width: 860px){
    gap: 16px;
     }
}

.header-menu li {
  display: flex;
  align-items: center;
  height: 32px;
  position: relative;
  text-decoration: none;
  color: #FFFFFF;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  .icon{
    margin-right: 8px;
  }
}

.header-menu #home::after {
  content: "";
  display: block;
  height: 2px;
  align-self: flex-end;
  width: ${(props) => (props.activeHome ? "100%" : "0%")};
  background-color: white;
  margin-top: 4px;
  transition: 0.3s;
  position: absolute;
}
.header-menu #profile::after {
  content: "";
  align-self: flex-end;
  display: block;
  height: 2px;
  width: ${(props) => (props.activeProfile ? "100%" : "0%")};
  background-color: white;
  margin-top: 4px;
  transition: 0.3s;
  position: absolute;
}

.header-menu #ranking::after {
  content: "";
  align-self: flex-end;
  display: block;
  height: 2px;
  width: ${(props) => (props.activeRanking ? "100%" : "0%")};
  background-color: white;
  margin-top: 4px;
  transition: 0.3s;
  position: absolute;
}

.header-menu #home:hover:after {
  width: 100%;
}
.header-menu #profile:hover:after {
  width: 100%;
}
.header-menu #ranking:hover:after {
  width: 100%;
}
`

const LogoutButton = styled(Box)`
  color: white;
  padding-left: 16px;
  margin-bottom: -8px;
  @media screen and (max-width: 860px) {
    padding-left: 0px;
  }
`

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Container
      activeHome={location.pathname === "/home"}
      activeProfile={location.pathname === "/profile"}
      activeRanking={location.pathname === "/rank"}
    >
      <header className="header-bg">
        <div className="header container">
          <img id="logo"
            src={logo}
            alt="Technical Share"
            onClick={() => navigate("/home")}
          />
          <nav>
            <ul className="header-menu">
              <li id="home" onClick={() => navigate("/home")}>
                <Home className="icon" />
                <p>Home</p>
              </li>
              <li id="profile" onClick={() => navigate("/profile")}>
                <Person className="icon" />
                <p>Perfil</p>
              </li>
              <li id="ranking" onClick={() => navigate("/rank")}>
                <Leaderboard className="icon" />
                <p>Ranking</p>
              </li>
              <li>
                <LogoutButton
                  onClick={() => {
                    localStorage.clear()
                    navigate("/")
                  }}
                >
                  <LogoutIcon />
                </LogoutButton>
              </li>
            </ul>

          </nav>
        </div>
      </header>
    </Container>
  )
}
