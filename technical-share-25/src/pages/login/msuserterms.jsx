import { Button } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import styledComponents from "styled-components"
import microsoftlogo from "../../assets/microsoftlogo.svg"
import { userID } from "../../services/urls"
import logo from "../../assets/breadcrumbs-logo.svg"

const PageContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 24px;
  max-width: 540px;
  a {
    color: #BA3300;
  }
  .button-container {
    display: flex;
    align-self: center;
    justify-content: space-around;
    width: 100%;
    margin-top: 28px;
  }
  h1{
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    margin: 16px 0;
  }
  h2{
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
  }
  p, a, ul {
    margin: 8px 0;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
  }
  img{
    margin-bottom: 32px;
    cursor: pointer;
    @media screen and (max-width: 704px) {
      display: none;
    }
  }
  ul {
    margin-left: 16px;
  }
  @media screen and (min-width: 704px) {
    display: flex;
    align-content: center;
    junstify-contenc: center;
    width: 100%;
    margin: 10vh 0;
    border: 1px solid black;
  }
`

export default function Msuserterms() {
  const navigate = useNavigate()

  return (
    <PageContainer>
            <img src={logo} alt="logo" onClick={() => navigate('/')}/>
      <img src={microsoftlogo} alt="MicroSoft logo"></img>
      <h1>Permissões Necessárias</h1>
      <h2>Technical Share</h2>
      <p>Essa aplicação deseja ter acesso a(o):</p>
      <ul>
        <li>Nome e Sobrenome</li>
        <li>Foto de Perfil</li>
        <li>Email</li>
        <li>Número de telefone</li>
      </ul>
      <p>
        Aceitando essas permissões, você consente ao uso e compartilhamento
        dessas informações especificadas acima de acordo com a{" "}
        <a href="https://privacy.microsoft.com/en-us/privacystatement">
          política de privacidade
        </a>{" "}
        e aos{" "}
        <a href="https://privacy.microsoft.com/en-us/privacystatement">
          termos de serviço
        </a>{" "}
        da aplicação.
      </p>
      <div className="button-container">
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            localStorage.setItem("user_id", userID)
            navigate("/home")
          }}
        >
          Aceitar
        </Button>
      </div>
    </PageContainer>
  )
}
