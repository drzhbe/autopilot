import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as FilterIcon } from './assets/Filter.svg';
import { ReactComponent as ContactsIcon } from './assets/Contacts.svg';
import {
  baseline,
  lightGreen,
  brightGreen,
  lightestGray,
  lightGray,
  brightGray,
} from './baseStyle';

export const List = styled.ul`
  list-style: none;
  padding: ${baseline}px 0px;
  margin: 0px;
  border-bottom: 1px solid ${lightestGray};
  font-family: HelveticaNeue;

  :last-child {
    border-bottom: none;
  }
`;

export const ListItem = ({ item }) => {
  const [selected, setSelected] = useState(false);
  const { type, photo, name } = item;
  const picture = photo
      ? <Photo alt={name} src={photo} width={24} height={24}/>
      : type === 'person'
          ? <ContactsIcon/>
          : <RecolorableFilterIcon selected={selected}/>
  const toggleSelection = useCallback(() => setSelected(!selected), [selected, setSelected]);
  return (
    <StyledListItem selected={selected} onClick={toggleSelection}>
      <PictureWrapper>{picture}</PictureWrapper>
      <Name>{name}</Name>
    </StyledListItem>
  );
};

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  line-height: ${baseline * 4}px;
  padding: 0px ${baseline}px 0px ${baseline * 2}px;
  cursor: pointer;
  background-color: ${({ selected }) => selected ? lightGreen : 'unset'};

  :hover {
    background-color: ${lightGray};
  }
`;

const PictureWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${baseline * 3}px;
  height: ${baseline * 3}px;
`;

const Photo = styled.img`
  border-radius: 100%;
`;

const RecolorableFilterIcon = styled(({ selected, ...rest }) => <FilterIcon {...rest}/>)`
  fill: ${({ selected }) => selected ? brightGreen : brightGray };
`;

const Name = styled.div`
  font-size: ${baseline * 1.75}px;
  margin: 0px ${baseline}px;
`;
