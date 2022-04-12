import React, { Suspense } from "react"
import { useParams } from "react-router-dom"
import useRequestData from "../../hooks/useRequestData"
import { BASE_URL } from "../../services/urls"
import Loading from "../../assets/loading"
import styledComponents from "styled-components"
import { Chip } from "@mui/material"
import styled from "@emotion/styled"

const PageContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h4 {
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 36px;
    margin-bottom: 8px;
  }
  h6 {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h7 {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    align-self: flex-start;
    margin-left: 15%;
  }
`

const RankContainer = styledComponents.div`
  display: flex;
  justify-content: space-around;
  margin: 30px 0 22px 0;
  background: #e8eaf6;
  border-radius: 4px;
  width: 70%;
  text-align: center;
  padding: 8px;
`

const ProfilePic = styledComponents.img`
  width: 30%;
  border-radius: 150px;
  margin: 22px;
`

const Triangle = styledComponents.div`
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 16px solid #53c940;
  border-radius: 1px;
  margin-left: 4px;
`

const SkillsContainer = styledComponents.div`
    display: flex;
    flex-wrap: wrap;
    padding: 16px 15%;
`

const Skill = styled(Chip)`
  margin: 0 4px 8px 0;
  width: fit-content;
  background-color: #ba3300;
  color: #ffffff;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
`

function User() {
  const params = useParams()
  const { data, error, loading } = useRequestData(
    BASE_URL + "/users/" + params.id
  )

  const renderSkills = () => {
    const skillSet = data.skills.map((skill) => {
      return <Skill key={skill} id={skill} label={skill} />
    })
    return skillSet
  }

  const renderPage = () => {
    return (
      <PageContainer>
        <ProfilePic src={data.user.photo} />
        <h4>{data.user.user_name}</h4>
        <h6>{data.user.role}</h6>
        <RankContainer>
          <div>
            <h6>200</h6>
            <h8>Interações</h8>
          </div>
          <div>
            <h6>
              120
              <Triangle />
            </h6>
            <h8>Posição</h8>
          </div>
        </RankContainer>
        <h7>Conhecimentos e skills</h7>
        <SkillsContainer>{data ? renderSkills() : <></>}</SkillsContainer>
      </PageContainer>
    )
  }

  return <PageContainer>{data ? renderPage() : <Loading />}</PageContainer>
}

export default User
