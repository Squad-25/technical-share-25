import React from "react"
import styledComponents from "styled-components"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { useLocation, useNavigate } from "react-router-dom"
import breadcrumbsLogo from "../../assets/breadcrumbs-logo.png"

const Container = styledComponents.div`
 display: flex;
 align-items: center;
 align-self: flex-start; 
 font-size: 20px;
`

export default function BreadCrumbs() {
  const location = useLocation()
  const navigate = useNavigate()

  const path = location.pathname

  const renderComponent = () => {
    switch (path) {
      case '/':
        return <img src={breadcrumbsLogo} alt='technical share' />
      case '/profile':
        return <><ArrowBackIosNewIcon onClick={navigate()} /> <p>Meu Perfil</p></>
      case '/profile/edit':
        return <><ArrowBackIosNewIcon /> <p>Editar Perfil</p></>
      case '/rank':
        return <><ArrowBackIosNewIcon /> <p>Ranking</p></>
      case '/profile':
        return <><ArrowBackIosNewIcon /> <p>Meu Perfil</p></>
    }
  }



  return <Container>{renderComponent()}</Container>
}
