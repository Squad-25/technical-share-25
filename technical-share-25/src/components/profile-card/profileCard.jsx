import styled from "@emotion/styled"
import { Chip } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styledComponents from "styled-components"
import api from "../../services/api"
import Loading from '../../assets/loading'

const CardContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
  width: 312px;
  height: fit-content;
  padding: 12px;
  border: 1px solid #a8a8d1;
  border-radius: 4px;
  margin: 8px;
  cursor: pointer;
`

const InfoContainer = styledComponents.div`
  display: flex;
  margin-bottom: 20px;
  img {
    width: 46px;
    height: 46px;
    border-radius: 20px;
  }
  .mentor-name{
    font-weight: 500;
    font-size: 20px;
    font-style: normal;
    margin: 0 !important;
  }
  .mentor-role{
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    margin: 0 !important;
  }
`

const HeaderProfile = styledComponents.div`
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Skill = styled(Chip)`
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
    gap: 8px;
`

export default function ProfileCard({ mentorId }) {
  const [mentor, setMentor] = useState({
    name: '',
    role: '',
    photo: ''
  })

  const [tags, setTags] = useState();

  const numberOfSkillsToRender = 3;

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchMentor() {

      try {
        const response = await api.get(`users/${mentorId}`);
        const { data } = response;

        const mentor = {
          name: data.user.user_name,
          role: data.user.role,
          photo: data.user.photo,
        }

        const tags = data.skills;

        setMentor(mentor);
        setTags(tags);

      } catch (error) {
        console.log(error.message);
      }
    }

    fetchMentor();

  }, [])

  const renderSkills = () => {

    const skillset = tags.map((skill, index) => {
      if (index < numberOfSkillsToRender) {
        return <Skill key={skill} id={skill} label={skill} />
      } else {
        return <></>
      }
    })

    return skillset
  }

  return (
        <CardContainer onClick={() => navigate('/user/' + mentorId)}>
          {tags ? <><InfoContainer>
        <HeaderProfile>
          <img src={mentor.photo} alt={`${mentor.name} profile`} />
          <div style={{ height: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginLeft: '16px' }}>
            <p className="mentor-name">{mentor.name}</p>
            <p className="mentor-role">{mentor.role}</p>
          </div>
        </HeaderProfile>
      </InfoContainer>
      <SkillsContainer>{tags ? renderSkills() : <></>}</SkillsContainer>
</> : <Loading />}
          </CardContainer>
  )
}
