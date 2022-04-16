import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useRequestData from "../../hooks/useRequestData"
import { BASE_URL, userID } from "../../services/urls"
import Loading from "../../assets/loading"
import styledComponents from "styled-components"
import { Chip, Grid } from "@mui/material"
import styled from "@emotion/styled"
import PhoneIcon from "@mui/icons-material/Phone"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import EditIcon from "@mui/icons-material/Edit"
import axios from "axios"
import QuestionCard from "../../components/QuestionCard"

const PageContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
  span {
    height: 18px;
  }
  h4 {
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 36px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
  }
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h3{
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
  }
  h5 {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    align-self: flex-start;
    margin-left: 8%;
  }
  .contato{
      margin-bottom: 12px;
  }
  .icon{
    color: #A8A8D1;
    cursor: pointer;
    font-size: 30px;
    margin-left:  5px;
  }
`

const PostsContainer = styledComponents.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    align-self: flex-start;
    width: 100%;
`

const RankContainer = styledComponents.div`
  display: flex;
  justify-content: space-around;
  margin: 30px 0 22px 0;
  background: #e8eaf6;
  border-radius: 4px;
  width: 84%;
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
    align-self: flex-start;
    display: flex;
    flex-wrap: wrap;
    padding: 16px 8%;
`

const ContactContainer = styledComponents.div`
    display: flex;
    margin: 4px 8%;
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
    align-items: center;
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

function UserProfile() {
  const { data } = useRequestData(BASE_URL + "/users/" + userID)
  const [posts, setPosts] = useState()

  useEffect(() => {
    axios
      .get(BASE_URL + "/user/" + userID + "/posts")
      .then((res) => setPosts(res.data))
  }, [])

  const navigate = useNavigate()

  const renderSkills = () => {
    const skillSet = data.skills.map((skill) => {
      return <Skill key={skill} id={skill} label={skill} />
    })
    return skillSet
  }

  const renderPosts = () => {
    const postFeed = posts ? (
      posts.posts.map((post) => {
        return <QuestionCard postId={post.post_id} />
      })
    ) : (
      <></>
    )

    return postFeed
  }

  const renderPage = () => {
    if (data.user) {
      return (
        <Grid item sx={{ width: '312px', height: '166px !important' }}>
          <PageContainer>
            <ProfilePic src={data.user.photo} />
            <h4>
              {data.user.user_name}{" "}
              <EditIcon
                className="icon"
                onClick={() => navigate("/profile/edit")}
              />
            </h4>
            <h2>{data.user.role}</h2>
            <RankContainer>
              <div>
                <h2>200</h2>
                <h3>Interações</h3>
              </div>
              <div>
                <h2>
                  120
                  <Triangle />
                </h2>
                <h3>Posição</h3>
              </div>
            </RankContainer>
            <h5>Conhecimentos e skills</h5>
            <SkillsContainer>{data ? renderSkills() : <></>}</SkillsContainer>
            <h5 className="contato">Contato</h5>
            <ContactContainer>
              <PhoneIcon />
              <a href={`tel:+55${data.user.phone}`}>{data.user.phone}</a>
            </ContactContainer>
            <ContactContainer>
              <MailOutlineIcon />
              <a href={`mailto:${data.user.email}`}>{data.user.email}</a>
            </ContactContainer>
            <PostsContainer>
              <h5>Minhas Perguntas</h5>
              <span />
              {renderPosts()}
            </PostsContainer>
          </PageContainer>
        </Grid>
      )
    } else
      return (
        <LoadingContainer>
          <h2>Ops! Perfil não encontrado</h2>
        </LoadingContainer>
      )
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

export default UserProfile
