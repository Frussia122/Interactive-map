import React, { useEffect, useState } from 'react';

import { Buttons } from './buttons/index';
import duck from 'shared/PreLoaders/duck.gif';
import { useDispatch, useSelector } from 'react-redux';
import { setIsClose } from 'shared/models/slices/controlsSlice';
import { AllPlaces } from 'shared/models/slices/controlsDataSlice';
import {
  Wrapper,
  PlaceItem,
  Title,
  Street,
  PlaceLink,
  HoursInfo,
  Preloader,
} from './styled';

export const Place = ({ mapRef }) => {
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
            <HoursInfo>{properties.CompanyMetaData?.Hours?.text || 'Нет информации'}</HoursInfo>
            <Buttons mapRef={mapRef} geometry={geometry} properties={properties}/>
          </PlaceItem>
        ))
      )}
    </Wrapper>
  );
}

