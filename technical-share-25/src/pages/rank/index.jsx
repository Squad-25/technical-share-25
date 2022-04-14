import React, { useEffect, useState } from 'react'
import styledComponents from 'styled-components';

import { Typography } from '@mui/material'

import Trophy_1st from '../../assets/trophy_1st.svg';
import Trophy_2st from '../../assets/trophy_2st.svg';
import Trophy_3st from '../../assets/trophy_3st.svg';
import ArrowUp from '../../assets/arrow-up-icon.svg';
import Avatar from '../../assets/avatar.svg';

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
      position: 1,
      participant: {
        avatar: Avatar,
        name: 'sabrina'
      },
      points: 150
    },
    {
      position: 2,
      participant: {
        avatar: Avatar,
        name: 'kleuvys'
      },
      points: 144
    },
    {
      position: 3,
      participant: {
        avatar: Avatar,
        name: 'elemento'
      },
      points: 139
    },
    {
      position: '#4',
      participant: {
        avatar: Avatar,
        name: 'elemento4'
      },
      points: 125
    },
    {
      position: '#5',
      participant: {
        avatar: Avatar,
        name: 'elemento5'
      },
      points: 111
    },
    {
      position: '#6',
      participant: {
        avatar: Avatar,
        name: 'elemento6'
      },
      points: 100
    }
  ]);

  function rankingWithTrophys() {
    const newRanking = [...ranking];

    newRanking[0].position = <img src={Trophy_1st} alt="primeiro lugar" />;
    newRanking[1].position = <img src={Trophy_2st} alt="segundo lugar" />;
    newRanking[2].position = <img src={Trophy_3st} alt="terceiro lugar" />;

    setRanking(newRanking);
  }

  useEffect(() => {
    rankingWithTrophys();
  }, [ranking])

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
              {item.position}
            </Position>
            <Person>
              <img src={item.participant.avatar} alt={item.participant.name} />
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
