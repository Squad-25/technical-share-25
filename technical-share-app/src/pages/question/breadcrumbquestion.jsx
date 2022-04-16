import React from "react"
import styledComponents from "styled-components"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { useNavigate } from "react-router-dom"

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
`

export default function BreadCrumbQuestion(props) {
  const navigate = useNavigate()

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

  return <>
    <Container>
      <Icon /> <p>Pergunta</p>
    </Container>
  </>
}
