import styled from "@emotion/styled"
import { Chip } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import styledComponents from "styled-components"

const CardContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
  width: 312px;
  height: 124px;
  border: 1px solid #a8a8d1;
  border-radius: 4px;
  margin: 8px;
  cursor: pointer;
`

const InfoContainer = styledComponents.div`
  display: flex;
  margin: 16px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
  div{
    margin-left: 16px;
  }
  h6{
    font-weight: 500;
    font-size: 20px;
    font-style: normal;
  }
  h7{
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    margin: 0;
  }
`

const Skill = styled(Chip)`
  margin: 0 4px 8px 0;
  width: fit-content;
  background-color: #fbe9e7;
  color: #000000de;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
`

const SkillsContainer = styledComponents.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0 8px;
`

export default function ProfileCard(props) {

  const navigate = useNavigate()

  const renderSkills = () => {
    if (props.skills.length > 3) props.skills.length = 3

    const skillset = props.skills.map((skill) => {
      return <Skill key={skill} id={skill} label={skill} />
    })

    return skillset
  }

  return (
    <CardContainer onClick={() => navigate('/user/'+props.id)}>
      <InfoContainer>
        <img src={props.photo} alt={`${props.user_name} profile`} />
        <div>
          <h6>{props.user_name}</h6>
          <h7>{props.role}</h7>
        </div>
      </InfoContainer>
      <SkillsContainer>{props.skills ? renderSkills() : <></>}</SkillsContainer>
    </CardContainer>
  )
}