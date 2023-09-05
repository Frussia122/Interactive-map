/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import MapCategory from 'UI/MapCategory/MapCategory';
import RouteControl from 'UI/routeControl/RouteControl';
import CurrentPlaces from 'components/CurrentPlaces/CurrentPlaces';
import { MapYContext } from 'components/map/MapContext';
import { currentRoutePanel, currentIsClose, currentPlacesPanel } from 'store/slices/controlsSlice';
import { useSelector } from 'react-redux';
import Wrapper from './styled';

function Controls({ mapRef, isOpen }) {
  const {
    currentPlaces,
    setCurrentPlaces,
  } = useContext(MapYContext);

  const routePanel = useSelector(currentRoutePanel);
  const placesPanel = useSelector(currentPlacesPanel);
  const isClose = useSelector(currentIsClose);

  return (
    <Wrapper style={isOpen ? { left: '0' } : { left: '-100%' }}>
      {routePanel && <RouteControl mapRef={mapRef} />}
      {!routePanel && placesPanel && (
      <CurrentPlaces
        mapRef={mapRef}
        currentPlaces={currentPlaces}
        isClose={isClose}
      />
      )}
      {!routePanel && !placesPanel && (
        <MapCategory
          mapRef={mapRef}
          setCurrentPlaces={setCurrentPlaces}
        />
      )}
    </Wrapper>
  );
}

export default Controls;
