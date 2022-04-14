import React from "react"
import styledComponents from "styled-components"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { useLocation, useNavigate } from "react-router-dom"
import breadcrumbsLogo from "../../assets/breadcrumbs-logo.svg"
import styled from "@emotion/styled"
import { Button } from "@mui/material"

const Container = styledComponents.div`
 display: flex;
 align-items: center;
 align-self: flex-start; 
 font-size: 20px;
 margin: 16px 32px;
 p{
   margin-left: 16px;
   font-style: normal;
   font-weight: 500;
   font-size: 20px;
 }
 img {
   width: 206px;
 }
`

const LogoutButton = styled(Button)`
  position: absolute;
 right: 0;
`

export default function BreadCrumbs() {
  const location = useLocation()
  const navigate = useNavigate()

  const path = location.pathname

  const Icon = () => {
    return (
      <ArrowBackIosNewIcon
        className="icon"
        onClick={() => {
          navigate(-1)
        }}
      />
    )
  }

  const renderComponent = () => {
    switch (path) {
      case "/home":
        return (
          <Container>
            <img src={breadcrumbsLogo} alt="technical share" />
            <LogoutButton
            onClick={() => {
              localStorage.clear()
              navigate("/")
            }}
          >
            Logout
          </LogoutButton>
          </Container>
        )
      case "/profile":
        return (
          <Container>
            <Icon /> <p>Meu Perfil</p>
          </Container>
        )
      case "/profile/edit":
        return (
          <Container>
            <Icon /> <p>Editar Perfil</p>
          </Container>
        )
      case "/rank":
        return (
          <Container>
            <Icon /> <p>Ranking</p>
          </Container>
        )
      case "/posts/new":
        return (
          <Container>
            <Icon /> <p>Nova Pergunta</p>
          </Container>
        )
      case "/question":
        return (
          <Container>
            <Icon /> <p>Pergunta</p>
          </Container>
        )
      case "/skills-prompt":
        return (
          <Container>
            <Icon /> <p>Skills</p>
          </Container>
        )
      default:
        return
    }
  }

  return <>{renderComponent()}</>
}
