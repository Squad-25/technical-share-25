import { useEffect, useState } from 'react';
import api from '../../services/api';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Grid, Stack } from '@mui/material';

import ArrowUpIcon from '../../assets/arrow-up-icon.svg';
import CommentIcon from '../../assets/comment-icon.svg';
import styled from '@emotion/styled';
import Loading from '../../assets/loading';

const Skill = styled(Chip)`
margin: 0 4px 8px 0;
width: fit-content;
background-color: #fbe9e7;
color: #000000de;
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 14px;
`


export default function QuestionCard({ postId, showComments = false }) {
    const [post, setPost] = useState({
        title: '',
        body: '',
        postDate: '',
        votes: 0,
        userId: 0
    });

    const [comments, setComments] = useState([{
        body: '',
        date: '',
        votes: 0
    }]);

    const [tags, setTags] = useState();


    useEffect(() => {
        async function fetchPost() {

            try {
                const response = await api.get(`posts/${postId}`);
                const { data } = response;

                const post = {
                    title: data.post.title,
                    body: data.post.body,
                    postDate: data.post.post_date,
                    votes: data.post.votes,
                    userId: data.post.user_id
                }

                const comments = data.comments.map(comment => {
                    const formattedComment = {
                        body: data.comments.comment_body,
                        date: data.comments.comment_date,
                        votes: data.comments.comment_votes
                    }
                    return formattedComment;
                })

                const tags = data.tags;

                setPost(post);
                setComments(comments);
                setTags(tags);

            } catch (error) {
                console.log(error.message);
            }
        }

        fetchPost();

    }, [postId]);


    const handleUpVote = async () => {
        try {
            await api.put(`posts/${postId}`, {
                direction: 1
            });

            setPost({ ...post, votes: post.votes + 1 });

        } catch (error) {
            console.log(error.message);
        }
    }

    const handleComment = (postId) => {

    }

    return (
        <Grid item mobile={12} tablet={6} desktop={4}>

            <Box sx={{ minWidth: 275, maxWidth: 600, margin: '0 auto', marginBottom: '10px' }}>
                <Card variant="outlined" sx={{ margin: '0 auto' }}>
                    <CardContent sx={{ '&.MuiCardContent-root': { padding: '0 16px' } }}>
                        <Typography variant="h6" sx={{}} gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography paragraph>
                            {post.body}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            {tags.map(tag => {
                                return (
                                    <Skill key={tag} label={tag} />
                                )
                            })}
                        </Stack>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between', margin: '0 10px', '&.MuiCardActions-root': { padding: '4px 0px' } }}>
                        <Stack direction="row" spacing={0}>
                            <Button aria-label="curtir a pergunta" onClick={() => handleUpVote()}>
                                <img src={ArrowUpIcon} alt="curtir a pergunta" />
                                <span style={{ color: '#212121', marginLeft: '10px' }}>{post.votes}</span>
                            </Button>
                            <Button aria-label="responder a pergunta" onClick={() => handleComment()}>
                                <img src={CommentIcon} alt="responder a pergunta" />
                                <span style={{ color: '#212121', marginLeft: '10px' }}>{comments.length}</span>
                            </Button>
                        </Stack>

                        <Typography component="span">
                            1h
                        </Typography>
                    </CardActions>
                </Card>
            </Box>
        </Grid>
    );
}