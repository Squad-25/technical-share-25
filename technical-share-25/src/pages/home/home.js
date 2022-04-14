import BottomNavigationComponent from "../../components/BottomNavigationComponent";
import { Divider, Typography } from "@mui/material";

import QuestionCard from "../../components/QuestionCard";
import { useEffect, useState } from "react";
import api from "../../services/api";
import TogglePeoplePost from "../../components/TogglePeoplePost";
import SearchBar from "../../components/search-bar/searchBar";
import HomeFab from "../../components/home-fab";


export default function Home() {
  const [posts, setPosts] = useState([{ postId: '' }]); //ids de todas perguntas para pesquisar no banco

  const [skillsNamesSelected, SetSkillsNamesSelected] = useState([]);

  useEffect(() => {

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

    fetchAllPosts();


  }, [skillsNamesSelected]);

  return (
    <div className="PageContainer" style={{marginBottom: "140px"}}>


      <TogglePeoplePost />

      <SearchBar skills={skillsNamesSelected} setSkills={SetSkillsNamesSelected} />

      <Divider sx={{ width: '100%', margin: '16px 0' }} />

      <Typography sx={{ fontSize: '16px', marginBottom: '16px' }}>
        Resultados
      </Typography>
      {
        posts.map(post => (
          <QuestionCard key={post.postId} postId={post.postId} />
        ))
      }

      <BottomNavigationComponent />
      <HomeFab />
    </div>
  )
}