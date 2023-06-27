/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faRoute, faStar } from '@fortawesome/free-solid-svg-icons';
import addMultiRoute from 'Utils/Controls/addMultiRoute';
import { MapYContext } from 'components/map/MapContext';

import {
  Wrapper,
  PlaceItem,
  Title,
  Street,
  PlaceLink,
  HoursInfo,
  Button,
  ButtonWrapper,
} from './styled';

function CurrentPlaces({ currentPlaces, mapRef }) {
  const {
    setMultiRoute,
    setRoutePanel,
    setIsClose,
    routePanel,
  } = useContext(MapYContext);

  useEffect(() => {
    setIsClose(true);
  }, []);

  const handlePanToLocation = (coords) => {
    mapRef.current.geoObjects.each((geoObject) => {
      if (geoObject.geometry._coordinates === coords) {
        geoObject.balloon.open();
        mapRef.current.setCenter(coords);
      }
    });
  };
  const handleRoute = (coords) => {
    const lng = localStorage.getItem('currentLongitude');
    const lat = localStorage.getItem('currentLatitude');
    if (lat && lng) {
      const currentRoute = addMultiRoute(mapRef, [lat, lng], coords);
      setMultiRoute(currentRoute);
      setRoutePanel(!routePanel);
      setIsClose(true);
    }
  };
  return (
    <Wrapper>
      {currentPlaces.map(({ properties, geometry }) => (
        <PlaceItem
          key={properties.CompanyMetaData.id}
          role="button"
        >
          <Title>{properties.name}</Title>
          <Street>{properties.description}</Street>
          <PlaceLink href={properties.CompanyMetaData?.url} target="_blank">
            Сайт -
            {properties.CompanyMetaData?.url || 'Отсутствует'}
          </PlaceLink>
          <HoursInfo>{properties.CompanyMetaData?.Hours?.text || 'Неизвестно'}</HoursInfo>
          <ButtonWrapper>
            <Button onClick={() => handlePanToLocation(geometry.coordinates)}>
              <FontAwesomeIcon icon={faLocationArrow} />
            </Button>
            <Button onClick={() => handleRoute(properties.description)}>
              <FontAwesomeIcon icon={faRoute} />
            </Button>
            <Button>
              <FontAwesomeIcon icon={faStar} />
            </Button>
          </ButtonWrapper>
        </PlaceItem>
      ))}
    </Wrapper>
  );
}

export default CurrentPlaces;
