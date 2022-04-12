import React from 'react'
import styled from 'styled-components'
import laranja from './loading-laranja.png'

const LoadingIcon = styled.img`
align-self: center;
justify-self: center;
width: 40px;
  animation: load 1000ms ease infinite;
  @keyframes load {
    from {transform: rotate(0deg)}
    to {transform: rotate(-364deg)}
  }
`

export default function Loading() {
  return (
    <>
    <LoadingIcon src={laranja} alt='carregando'/>
    </>
  )
}
