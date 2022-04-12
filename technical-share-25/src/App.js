import BottomNavigationComponent from "./components/BottomNavigationComponent";
import { Container, Typography } from "@mui/material";

import './App.css'
import QuestionCard from "./components/QuestionCard";
import { useEffect, useState } from "react";
import api from "./services/api";
import TogglePeoplePost from "./components/TogglePeoplePost";

/* 
id": 1,
    "user_name": "francisco kleuvys",
    "photo": "my_photo",
    "post_id": "851275da-11b7-4776-97af-2e284695d3ea",
    "title": "Seletor CSS/jQuery para uma coluna da tabela",
    "body": "Existe algum seletor CSS ou do jQuery que pegue uma coluna de uma tabela...",
    "post_date": "2022-04-12T03:01:56.000Z",
    "votes": 22
*/

/* 

<ToggleButtonGroup
  color="primary"
  value={alignment}
  exclusive
  onChange={handleChange}
>
  <ToggleButton value="web">Web</ToggleButton>
  <ToggleButton value="android">Android</ToggleButton>
  <ToggleButton value="ios">iOS</ToggleButton>
</ToggleButtonGroup>

*/

function App() {
  const [posts, setPosts] = useState([{
    postId: ''
  }]);

  useEffect(() => {

    async function fetchAllPostsIds() {
      try {
        const { data } = await api.get(`posts`);

        const postsFormatted = data.map(post => { return { postId: post.post_id } });

        setPosts(postsFormatted);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchAllPostsIds();

  }, []);


  return (
    <>
      <Container sx={{ width: '360px', height: '100vh' }}>
        <Typography sx={{ fontSize: '24px', fontWeight: 700 }}>
          Technical Share
        </Typography>

        <TogglePeoplePost />

        {
          posts.map(post => (
            <QuestionCard key={post.postId} postId={post.postId} />
          ))
        }

        <BottomNavigationComponent />
      </Container>
    </>
  );
}

export default App;