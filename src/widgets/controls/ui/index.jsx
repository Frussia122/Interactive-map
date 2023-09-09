import React from 'react';
import Wrapper from './styled';

import { Category } from 'features/category';
import { Place } from 'features/places';
import { Route } from 'features/route';

import { currentRoutePanel, currentPlacesPanel } from 'shared/models/slices/controlsSlice';
import { useSelector } from 'react-redux';


export const Controls = ({ mapRef, isOpen }) => {
  const routePanel = useSelector(currentRoutePanel);
  const placesPanel = useSelector(currentPlacesPanel);

  return (
    <Wrapper style={isOpen ? { left: '0' } : { left: '-100%' }}>
      {routePanel && <Route mapRef={mapRef} />}
      {!routePanel && placesPanel && (<Place mapRef={mapRef}/>)}
      {!routePanel && !placesPanel && (<Category mapRef={mapRef} /> )}
    </Wrapper>
  );
}


