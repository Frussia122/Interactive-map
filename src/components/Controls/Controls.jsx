/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import MapCategory from 'UI/MapCategory/MapCategory';
import RouteControl from 'UI/routeControl/RouteControl';
import CurrentPlaces from 'components/CurrentPlaces/CurrentPlaces';
import { MapYContext } from 'components/map/MapContext';
import Wrapper from './styled';

function Controls({ mapRef, isOpen }) {
  const {
    routePanel,
    placesPanel,
    currentPlaces,
    setIsClose,
    isClose,
    setCurrentPlaces,
    setPlacesPanel,
  } = useContext(MapYContext);

  return (
    <Wrapper style={isOpen ? { left: '0' } : { left: '-100%' }}>
      {routePanel && <RouteControl mapRef={mapRef} />}
      {!routePanel && placesPanel && (
      <CurrentPlaces
        mapRef={mapRef}
        currentPlaces={currentPlaces}
        setIsClose={setIsClose}
        isClose={isClose}
      />
      )}
      {!routePanel && !placesPanel && (
        <MapCategory
          mapRef={mapRef}
          setCurrentPlaces={setCurrentPlaces}
          setPlacesPanel={setPlacesPanel}
        />
      )}
    </Wrapper>
  );
}

export default Controls;
