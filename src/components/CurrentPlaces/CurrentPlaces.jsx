/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import {
  Wrapper,
  PlaceItem,
  Title,
  Street,
  PlaceLink,
  HoursInfo,
} from './styled';

function CurrentPlaces({ currentPlaces, setIsClose, mapRef }) {
  useEffect(() => {
    setIsClose(true);
  }, []);

  const handleClick = (coords) => {
    mapRef.current.panTo(coords, {
      flying: true,
      duration: 500,
    });
  };
  return (
    <Wrapper>
      {currentPlaces.map(({ properties, geometry }) => (
        <PlaceItem
          key={properties.CompanyMetaData.id}
          role="button"
          onClick={() => handleClick(geometry.coordinates)}
        >
          <Title>{properties.name}</Title>
          <Street>{properties.description}</Street>
          <PlaceLink href={properties.CompanyMetaData?.url} target="_blank">
            Сайт -
            {properties.CompanyMetaData?.url || 'Отсутствует'}
          </PlaceLink>
          <HoursInfo>{properties.CompanyMetaData?.Hours?.text || 'Неизвестно'}</HoursInfo>
        </PlaceItem>
      ))}
    </Wrapper>
  );
}

export default CurrentPlaces;
