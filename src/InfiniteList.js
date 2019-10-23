import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { List, ListItem } from './List';
import { Preloader } from './Preloader';
import { InfiniteScroll } from './InfiniteScroll';

export const InfiniteList = ({ Content, dataService }) => {
  const [pages, setPages] = useState([]);
  const [lastPageIndex, setLastPageIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPage = useCallback(async pageNumber => {
    if (pageNumber > dataService.pageCount) {
      throw new Error(`We only have ${dataService.pageCount} pages, while you're trying to fetch page ${pageNumber}`);
    }
    setLoading(true);
    setLastPageIndex(pageNumber);
    const page = await dataService.fetchPage(pageNumber);
    setPages(oldPages => [...oldPages, page]);
    setLoading(false);
  }, [dataService]);

  const fetchNextPage = () => fetchPage(lastPageIndex + 1);

  useEffect(() => {
    fetchPage(1);
    fetchPage(2);
  }, [fetchPage]);

  return (
      <InfiniteContainer
          canLoadMore={!loading && lastPageIndex < dataService.pageCount}
          loadMore={fetchNextPage}>
        <Content pages={pages}/>
        {loading && <Preloader/>}
      </InfiniteContainer>
  );
};

const InfiniteContainer = styled(InfiniteScroll)`
  width: 340px;
  max-height: 225px;
  border-radius: 5px;
  box-shadow: rgba(16, 21, 23, 0.24) 0px 0px 12px;
`;

export const InfiniteContent = ({ pages }) => pages.map(({ items, id }) => (
    <List key={id}>
      {items.map((item, i) => (
        <ListItem key={i} item={item}/>
      ))}
    </List>
));
