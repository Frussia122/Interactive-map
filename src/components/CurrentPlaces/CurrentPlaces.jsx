/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faRoute } from '@fortawesome/free-solid-svg-icons';
import { handlePanToLocation } from 'Utils/Controls/currentPlacesHandlers';
import AddToFavorites from 'UI/addToFavorites/AddToFavorites';
import duck from 'assets/PreLoaders/duck.gif';
import { useDispatch, useSelector } from 'react-redux';
import { setIsClose, setRoutePanel } from 'store/slices/controlsSlice';
import { AllPlaces, setMultiRouteCoords } from 'store/slices/controlsDataSlice';
import {
  Wrapper,
  PlaceItem,
  Title,
  Street,
  PlaceLink,
  HoursInfo,
  Button,
  ButtonWrapper,
  Preloader,
} from './styled';

function CurrentPlaces({ mapRef }) {
  const dispatch = useDispatch();
  const currentPlaces = useSelector(AllPlaces);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(setIsClose(true));
  }, []);

  useEffect(() => {
    if (currentPlaces && currentPlaces.length > 0) {
      setIsLoading(false);
    }
  }, [currentPlaces]);

  const handleClick = (coords) => {
    dispatch(setRoutePanel(true));
    dispatch(setMultiRouteCoords(coords));
  };
  return (
    <Wrapper>
      {isLoading ? (
        <Preloader src={duck} alt="loader" />
      ) : (
        currentPlaces.map(({ properties, geometry }) => (
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
              <Button onClick={() => handlePanToLocation(geometry.coordinates, mapRef)}>
                <FontAwesomeIcon icon={faLocationArrow} />
              </Button>
              <Button onClick={() => handleClick(geometry.coordinates)}>
                <FontAwesomeIcon icon={faRoute} />
              </Button>
              <AddToFavorites properties={properties} geometry={geometry} />
            </ButtonWrapper>
          </PlaceItem>
        ))
      )}
    </Wrapper>
  );
}

export default CurrentPlaces;
