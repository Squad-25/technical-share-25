import BottomNavigationComponent from "../../components/BottomNavigationComponent"
import { Divider, Typography } from "@mui/material"
import QuestionCard from "../../components/QuestionCard"
import ProfileCard from "../../components/profile-card/profileCard"
import { useEffect, useState } from "react"
import api from "../../services/api"
import TogglePeoplePost from "../../components/TogglePeoplePost"
import SearchBar from "../../components/search-bar/searchBar"
import HomeFab from "../../components/home-fab"
import styled from "styled-components"

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 140px;
`

export default function Home() {
  const [posts, setPosts] = useState([{ postId: "" }]) //ids de todas perguntas para pesquisar no banco
  const [mentors, setMentors] = useState([{ mentorId: "" }])

  const [toggle, setToggle] = useState("pessoas")
  const [skillsNamesSelected, SetSkillsNamesSelected] = useState([])

  useEffect(() => {
    toggle === "pessoas" ? fetchAllMentors() : fetchAllPosts()
  }, [skillsNamesSelected, toggle])

  async function fetchAllMentors() {
    try {
      const { data } = await api.get("users")

      const mentorsFormatted =
        skillsNamesSelected.length === 0
          ? data.map((mentor) => {
              return { mentorId: mentor.id }
            })
          : data
              .map((mentor) => {
                const mentorHasWantedSkill = mentor.tags.some((tag) =>
                  skillsNamesSelected.includes(tag)
                )
                if (mentorHasWantedSkill) {
                  return { mentorId: mentor.id }
                } else {
                  return { mentorId: null }
                }
              })
              .filter((mentor) => mentor.mentorId != null)

      console.log("mentors pesquisados:", mentorsFormatted)

      setMentors(mentorsFormatted)
    } catch (error) {
      console.log(error.message)
    }
  }

  async function fetchAllPosts() {
    try {
      const { data } = await api.get("posts")

      const postsFormatted =
        skillsNamesSelected.length === 0
          ? data.map((post) => {
              return { postId: post.post_id }
            })
          : data
              .map((post) => {
                const postHasWantedSkill = post.tags.some((tag) =>
                  skillsNamesSelected.includes(tag)
                )
                if (postHasWantedSkill) {
                  return { postId: post.post_id }
                } else {
                  return { postId: null }
                }
              })
              .filter((post) => post.postId != null)

      console.log("posts pesquisados:", postsFormatted)

      setPosts(postsFormatted)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <PageContainer>
      <TogglePeoplePost toggle={toggle} setToggle={setToggle} />

      <SearchBar
        skills={skillsNamesSelected}
        setSkills={SetSkillsNamesSelected}
      />

      <Divider sx={{ width: "100%", margin: "16px 0" }} />

      <Typography sx={{ fontSize: "16px", marginBottom: "16px" }}>
        Resultados
      </Typography>

      {toggle === "pessoas"
        ? mentors.map((mentor) => (
            <ProfileCard key={mentor.mentorId} mentorId={mentor.mentorId} />
          ))
        : posts.map((post) => (
            <QuestionCard key={post.postId} postId={post.postId} />
          ))}

      <BottomNavigationComponent />
      <HomeFab />
    </PageContainer>
  )
}
