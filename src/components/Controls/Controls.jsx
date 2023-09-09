/* eslint-disable react/prop-types */
import React from 'react';
import MapCategory from 'UI/MapCategory/MapCategory';
import RouteControl from 'UI/routeControl/RouteControl';
import CurrentPlaces from 'components/CurrentPlaces/CurrentPlaces';
import { currentRoutePanel, currentPlacesPanel } from 'store/slices/controlsSlice';
import { useSelector } from 'react-redux';
import Wrapper from './styled';

function Controls({ mapRef, isOpen }) {
  const routePanel = useSelector(currentRoutePanel);
  const placesPanel = useSelector(currentPlacesPanel);

  return (
    <Wrapper style={isOpen ? { left: '0' } : { left: '-100%' }}>
      {routePanel && <RouteControl mapRef={mapRef} />}
      {!routePanel && placesPanel && (
      <CurrentPlaces mapRef={mapRef} />
      )}
      {!routePanel && !placesPanel && (
        <MapCategory mapRef={mapRef} />
      )}
    </Wrapper>
  );
}

export default Controls;
