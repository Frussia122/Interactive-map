/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.ul`
margin-top: 80px;
padding: 0;
margin-left: 20px;
overflow-y:scroll;
margin-bottom: 50px;
height:600px;
`;
const PlaceItem = styled.li`
list-style: none;
padding: 10px 0;
border-bottom: 1px solid gray;
display: flex;
flex-direction: column;
`;
const Title = styled.h4`
    font-weight: semi-bold;
    margin:0;
    font-size: 20px;
`;
const Street = styled.span`
font-size: 12px;
margin: 5px 0;
color: gray;
`;

const PlaceUrl = styled.a`
    margin: 5px 0;
    color: blue;
    &:hover{
        text-decoration: underline;
    }
    cursor: pointer;
`;

const Hours = styled.div`
    margin-top: 5px;
    font-size:12px;
`;
function CurrentPlaces({ currentPlaces, setIsClose, IsClose }) {
  useEffect(() => {
    console.log(currentPlaces);
    setIsClose(true);
    console.log(IsClose);
  });
  return (
    <Wrapper>
      {currentPlaces.map((place) => (
        <PlaceItem key={place.properties.CompanyMetaData.id}>
          <Title>
            {place.properties.name}
          </Title>
          <Street>
            {place.properties.description}
          </Street>
          <PlaceUrl>
            Сайт -
            {place.properties.CompanyMetaData.url ? place.properties.CompanyMetaData.url : 'Нету сайта'}
          </PlaceUrl>
          <Hours>
            {place.properties.CompanyMetaData.Hours.text}
          </Hours>
        </PlaceItem>
      ))}
    </Wrapper>
  );
}

export default CurrentPlaces;
