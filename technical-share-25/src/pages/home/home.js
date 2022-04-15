import { useEffect, useState } from "react";
import api from "../../services/api";
import styledComponents from 'styled-components';

import BottomNavigationComponent from "../../components/BottomNavigationComponent";
import { Divider, Grid, Typography, FormGroup, FormControlLabel, Switch } from "@mui/material";

import QuestionCard from "../../components/QuestionCard";
import ProfileCard from "../../components/profile-card/profileCard";
import TogglePeoplePost from "../../components/TogglePeoplePost";
import SearchBar from "../../components/search-bar/searchBar";
import HomeFab from "../../components/home-fab";

const TogglesGroup = styledComponents.div`
  @media(min-width: 360px){
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;

    .filter-toggle{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-items: flex-start;
    }
  }

  @media(min-width: 704px){
    width: 86.5%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;

    .filter-toggle{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-items: center;
    }
  }
`;

const SearchHeader = styledComponents.div`
  @media(min-width: 360px){
    width: 100%;
    min-width: 311px;
    margin: 30px auto 0;
    
  }

  @media(min-width: 704px){
    width: 90.90%;
    min-width: 680px;
    margin: 30px auto 0;
    
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.17);
  }
`;


export default function Home() {
  const [posts, setPosts] = useState([{ postId: '' }]); //ids de todas perguntas para pesquisar no banco
  const [mentors, setMentors] = useState([{ mentorId: '' }]);

  const [toggle, setToggle] = useState('pessoas');
  const [skillsNamesSelected, SetSkillsNamesSelected] = useState([]);

  useEffect(() => {

    toggle === 'pessoas' ? fetchAllMentors() : fetchAllPosts();

  }, [skillsNamesSelected, toggle]);

  async function fetchAllMentors() {
    try {
      const { data } = await api.get('users');

      const mentorsFormatted = skillsNamesSelected.length === 0 ?
        data.map(mentor => { return { mentorId: mentor.id } })
        :
        data.map(mentor => {
          const mentorHasWantedSkill = mentor.tags.some(tag => skillsNamesSelected.includes(tag));
          if (mentorHasWantedSkill) {
            return { mentorId: mentor.id }
          } else {
            return { mentorId: null }
          }
        }
        ).filter(mentor => mentor.mentorId != null);

      console.log('mentors pesquisados:', mentorsFormatted);

      setMentors(mentorsFormatted);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchAllPosts() {
    try {
      const { data } = await api.get('posts');

      const postsFormatted = skillsNamesSelected.length === 0 ?
        data.map(post => { return { postId: post.post_id } })
        :
        data.map(post => {
          const postHasWantedSkill = post.tags.some(tag => skillsNamesSelected.includes(tag));
          if (postHasWantedSkill) {
            return { postId: post.post_id }
          } else {
            return { postId: null }
          }
        }
        ).filter(post => post.postId != null);

      console.log('posts pesquisados:', postsFormatted);

      setPosts(postsFormatted);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Grid container spacing={2} sx={{ width: '100wv', padding: '24.5px', marginBottom: "140px" }}>
      {/* <div className="PageContainer" style={{ marginBottom: "140px" }}> */}


      <SearchHeader>
        <Grid item mobile={12}>
          <Grid container spacing={3}>
            <TogglesGroup>
              <Grid item mobile={12} tablet={6} desktop={4}>
                <TogglePeoplePost toggle={toggle} setToggle={setToggle} />
              </Grid>
              <Grid item mobile={12} tablet={6} desktop={4}>
                <FormGroup sx={{ fontSize: '12px' }} className="filter-toggle">
                  <Switch />
                  <label>Filtrar perguntas pelas minhas skills</label>
                </FormGroup>
              </Grid>
            </TogglesGroup>
          </Grid>
        </Grid>

        <Grid item mobile={12}>
          <SearchBar skills={skillsNamesSelected} setSkills={SetSkillsNamesSelected} />
        </Grid>
      </SearchHeader>

      <Divider sx={{ width: '100%', margin: '16px 0' }} />

      <Typography sx={{ fontSize: '16px', marginBottom: '16px' }}>
        Resultados
      </Typography>

      {
        toggle === 'pessoas' ?
          mentors.map(mentor => (
            <ProfileCard key={mentor.mentorId} mentorId={mentor.mentorId} />
          ))
          :
          posts.map(post => (
            <QuestionCard key={post.postId} postId={post.postId} />
          ))
      }

      <BottomNavigationComponent />
      <HomeFab />
      {/* </div> */}
    </Grid>
  )
}