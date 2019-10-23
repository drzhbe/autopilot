import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
  baseline,
  lightestGray,
} from './baseStyle';

export const Preloader = props => {
  return (
      <Container>
        <Ball delay={0}/>
        <Ball delay={0.5}/>
        <Ball delay={1}/>
      </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: ${baseline * 2}px;
`;

const animation = ({ delay }) => css`
  ${pulse} 1s linear ${delay}s infinite alternate;
`;

const Ball = styled.div`
  border-radius: 100%;
  background-color: ${lightestGray};
  width: ${baseline * 2}px;
  height: ${baseline * 2}px;
  margin: 0 ${baseline}px;
  animation: ${animation};
`;

const pulse = keyframes`
  0% {
    opacity: 0.25;
  }
  100% {
    opacity: 1;
  }
`;
