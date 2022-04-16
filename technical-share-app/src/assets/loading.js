import React from 'react'
import styled from 'styled-components'
import laranja from './loading-laranja.png'

const LoadingIcon = styled.img`
align-self: center;
justify-self: center;
max-width: ${(props) => props.onButton ? '24px' : '46px'};
  animation: load 1500ms ease infinite;
  @keyframes load {
    from {transform: rotate(0deg)}
    to {transform: rotate(-364deg)}
  }
`

export default function Loading(props) {
  return (
    <>
    <LoadingIcon onButton={props?.onButton} src={laranja} alt='carregando'/>
    </>
  )
}