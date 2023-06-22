import React, { useEffect, useRef } from 'react';
import initializeMap from 'Utils/Map/initializeMap';
import getCurrentPosition from 'Utils/Map/getCurrentPosition';
import createMarker from 'Utils/Map/createMarker';
import SearchControl from 'UI/serachControl/SearchControl';
import MapCategory from 'UI/MapCategory/MapCategory';
import styled from 'styled-components';
import CurrentLocationControl from 'UI/currentLocationControl/CurrentLocationControl';

const Wrapper = styled.div`
  background: white;
  height: 100vh;
  width: 350px;
  z-index: 1005;
  top: 0;
  left: 0;
  position: absolute;
`;

function MapY() {
  const { ymaps } = window;
  const mapRef = useRef(null);

  useEffect(() => {
    if (ymaps) {
      ymaps.ready(() => {
        getCurrentPosition()
          .then(({ latitude, longitude }) => {
            mapRef.current = initializeMap(ymaps, latitude, longitude);
            createMarker(ymaps, mapRef, latitude, longitude);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }, [ymaps]);

  return (
    <div
      id="map"
      ref={mapRef}
    >
      <SearchControl mapRef={mapRef} />
      <Wrapper>
        <MapCategory mapRef={mapRef} />
      </Wrapper>
      <CurrentLocationControl mapRef={mapRef} />
    </div>
  );
}

export default MapY;
