import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { List, ListItem, InfiniteList } from './List';

export default function App() {
  // How many pages of data we have.
  const PAGE_COUNT = 4;

  const [pages, setPages] = useState([]);
  const [lastPageIndex, setLastPageIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPage = async pageNumber => {
    if (pageNumber > PAGE_COUNT) {
      throw new Error(`We only have ${PAGE_COUNT} pages, while you're trying to fetch page ${pageNumber}`);
    }
    setLoading(true);
    setLastPageIndex(pageNumber);
    const page = await import(`./data/page${pageNumber}.json`);
    setPages(oldPages => [...oldPages, page]);
    setLoading(false);
  };

  const fetchNextPage = () => fetchPage(lastPageIndex + 1);

  useEffect(() => {
    fetchPage(1);
    fetchPage(2);
  }, []);

  return (
    <div className="App">
      <CenteredContainer>
        <InfiniteList
            canLoadMore={!loading && lastPageIndex < PAGE_COUNT}
            loadMore={fetchNextPage}>
          {pages.map(({ items, id }) => (
            <List key={id}>
              {items.map((item, i) => (
                <ListItem key={i} item={item}/>
              ))}
            </List>
          ))}
        </InfiniteList>
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
