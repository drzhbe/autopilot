import React from 'react';
import styled from 'styled-components';
import { InfiniteContent, InfiniteList } from './InfiniteList';

export default function App() {
  const dataService = {
    pageCount: 4,
    // Use delayed fetch to see the preloader.
    fetchPage: pageNumber => delay(() => import(`./data/page${pageNumber}.json`), 500),
  };
  return (
    <div className="App">
      <CenteredContainer>
        <InfiniteList dataService={dataService} Content={InfiniteContent}/>
      </CenteredContainer>
    </div>
  );
}

const CenteredContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const delay = (fn, time) => new Promise(resolve => {
  setTimeout(() => resolve(fn()), time);
});
