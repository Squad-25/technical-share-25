import React from "react"
import { useParams } from "react-router-dom"
import useRequestData from "../../hooks/useRequestData"
import { BASE_URL } from "../../services/urls"
import Loading from "../../assets/loading"
import styledComponents from "styled-components"
import { Chip } from "@mui/material"
import styled from "@emotion/styled"
import PhoneIcon from "@mui/icons-material/Phone"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import ProfileCard from "../../components/profile-card/profileCard"

const PageContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottm
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
  .contato{
      margin-bottom: 12px;
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
  border-radius: 50%;
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

const ContactContainer = styledComponents.div`
    display: flex;
    margin: 4px 15%;
    align-self: flex-start;
    align-items: center;
    p, a{
        margin-left: 12px;
        text-decoration: none;
        color: #BA3300;
    }
`

const LoadingContainer = styledComponents.div`
    height: 90vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
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
    if (data.user) {
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
          <h7 className="contato">Contato</h7>
          <ContactContainer>
            <PhoneIcon />
            <a href={`tel:+55${data.user.phone}`}>{data.user.phone}</a>
          </ContactContainer>
          <ContactContainer>
            <MailOutlineIcon />
            <a href={`mailto:${data.user.email}`}>{data.user.email}</a>
          </ContactContainer>
        </PageContainer>
      )
    } else return <h1>Ops! Perfil não encontrado</h1>
  }

  return (
    <>
      {data ? (
        renderPage()
      ) : (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
    </>
  )
}

export default User
