/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import styled from 'styled-components';
import MapCategory from 'UI/MapCategory/MapCategory';
import RouteControl from 'UI/routeControl/RouteControl';
import CurrentPlaces from 'components/CurrentPlaces/CurrentPlaces';
import { MapYContext } from 'components/map/MapContext';

export const Wrapper = styled.div`
  background: white;
  height: 100vh;
  width: 400px;
  z-index: 1005;
  top: 0;
  left: 0;
  position: absolute;
  transition: all 0.2s linear;
`;

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
        <CurrentPlaces currentPlaces={currentPlaces} setIsClose={setIsClose} isClose={isClose} />
      )}
      {!routePanel && !placesPanel && (
        // eslint-disable-next-line max-len
        <MapCategory mapRef={mapRef} setCurrentPlaces={setCurrentPlaces} setPlacesPanel={setPlacesPanel} />
      )}
    </Wrapper>
  );
}

export default Controls;
