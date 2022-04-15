import React, { useEffect, useState } from 'react'
import styledComponents from 'styled-components';

import { Typography } from '@mui/material'

import Trophy_1st from '../../assets/trophy_1st.svg';
import Trophy_2st from '../../assets/trophy_2st.svg';
import Trophy_3st from '../../assets/trophy_3st.svg';
import ArrowUp from '../../assets/arrow-up-icon.svg';
import Avatar from '../../assets/avatar.svg';
import api from '../../services/api';

const PageContainer = styledComponents.div`
  width: 100vw;
  margin-bottom: 60px;
`;

const Header = styledComponents.div`
  width: 312px;
  margin: 0 auto 24px;
`;

const RankingContainer = styledComponents.div`
  width: 312px;
  height: fit-content;
  margin: 0 auto;
  
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const RankingPosition = styledComponents.div`
  width: 100%;
  height: 70px;
  margin: 0 auto;
  border: 1px solid #5252A3;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Position = styledComponents.div`
  color: #5252A3;
`

const Person = styledComponents.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.15px;
  
  img{
    width: 28px;
  }
`

const Points = styledComponents.div`
  img{
    margin-left: 9px;
  }
`

export default function Rank() {
  const [ranking, setRanking] = useState([
    {
      participant: {
        avatar: '',
        name: ''
      },
      points: 0
    }
  ]);

  let updateRanking = true;

  async function calculateRanking() {
    if (updateRanking) {
      const { data } = await api.get('posts');

      const usersPosts = data.map((post) => {
        return {
          participant: {
            avatar: '',
            name: post.user_name
          },
          points: post.votes
        }
      });

      const newRankingWithoutDuplicatesAndSummedPoints = [];

      usersPosts.reduce((acc, current) => {

        if (acc.participant.name === current.participant.name) {
          newRankingWithoutDuplicatesAndSummedPoints.push({
            participant: {
              avatar: '',
              name: acc.participant.name
            },
            points: acc.points + current.points
          });

          return {
            participant: {
              avatar: '',
              name: current.participant.name
            },
            points: acc.points + current.points
          }
        } else {
          newRankingWithoutDuplicatesAndSummedPoints.push({
            participant: {
              avatar: '',
              name: current.participant.name
            },
            points: current.points
          });

          return {
            participant: {
              avatar: '',
              name: current.participant.name
            },
            points: current.points
          }
        }
      });

      const rankingOrdered = newRankingWithoutDuplicatesAndSummedPoints.sort(function (rankingItem1, rankingItem2) {

        return rankingItem2.points - rankingItem1.points;
      });

      setRanking(rankingOrdered);
    }
  }

  useEffect(() => {
    calculateRanking();
  }, []);

  updateRanking = false;

  console.log(updateRanking);

  return (
    <PageContainer>
      <Header>
        <Typography variant="h6" >Ranking</Typography>
        <Typography>Ranking do Mês</Typography>
      </Header>

      <RankingContainer>

        {ranking.map((item, index) => (
          <RankingPosition>
            <Position>
              {index === 0 && (<img src={Trophy_1st} alt="primeiro lugar" />)}
              {index === 1 && (<img src={Trophy_2st} alt="segundo lugar" />)}
              {index === 2 && (<img src={Trophy_3st} alt="terceiro lugar" />)}
              {index > 2 && `#${index + 1}`}
            </Position>
            <Person>
              {item.participant.avatar === '' && (<img src={Avatar} alt={item.participant.name} />)}
              {item.participant.name}
            </Person>
            <Points>
              {item.points}
              <img src={ArrowUp} alt="Pontos subindo" />
              <div>
                Pontos
              </div>
            </Points>
          </RankingPosition>
        ))}

      </RankingContainer>
    </PageContainer>
  )
}
