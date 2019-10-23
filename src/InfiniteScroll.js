import throttle from 'lodash.throttle';
import React from 'react';
import styled from 'styled-components';

/**
 * Scrollable component that can load more data when being scrolled to a certain point.
 */
export const InfiniteScroll = ({ canLoadMore, loadMore, className, children }) => {
  // What time we can spend on each frame.
  const MS_PER_FRAME = 16; 
  // Scroll position that indicates when we can fetch the next portion of data.
  const SCROLL_THRESHOLD_TO_LOAD_MORE = 0.8;

  const onScroll = throttle(() => {
    const ref = containerRef.current;
    if (!canLoadMore || !ref) {
      return;
    }

    if ((ref.offsetHeight + ref.scrollTop) / ref.scrollHeight >= SCROLL_THRESHOLD_TO_LOAD_MORE) {
      loadMore();
    }
  }, MS_PER_FRAME);

  return (
    <Container className={className} ref={containerRef} onScroll={onScroll}>
      {children}
    </Container>
  );
};

const containerRef = React.createRef();

const Container = styled.div`
  overflow: scroll;
`;
