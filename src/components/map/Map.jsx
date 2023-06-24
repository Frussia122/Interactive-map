/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import initializeMap from 'Utils/Map/initializeMap';
import getCurrentPosition from 'Utils/Map/getCurrentPosition';
import createMarker from 'Utils/Map/createMarker';
import SearchControl from 'UI/serachControl/SearchControl';
import MapCategory from 'UI/MapCategory/MapCategory';
import CurrentLocationControl from 'UI/currentLocationControl/CurrentLocationControl';
import { faArrowPointer, faClose, faRoute } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RouteControl from 'UI/routeControl/RouteControl';
import CurrentPlaces from 'components/CurrentPlaces/CurrentPlaces';

import { RouteButton, Button, Wrapper } from './styled';

function MapY({ isOpen, setIsOpen }) {
  const [placesPanel, setPlacesPanel] = useState(false);
  const [currentPlaces, setCurrentPlaces] = useState([]);
  const [routePanel, setRoutePanel] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isClose, setIsClose] = useState(false);
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

  const handleHide = () => {
    setIsOpen(!isOpen);
  };
  const handleRoutePanel = () => {
    if (inputValue) {
      setInputValue('');
    } if (placesPanel) {
      setIsClose(!isClose);
      setRoutePanel(false);
      setPlacesPanel(false);
    } else {
      setRoutePanel(!routePanel);
      setIsClose(!isClose);
    }
  };

  return (
    <div
      id="map"
      ref={mapRef}
    >
      <SearchControl
        mapRef={mapRef}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setPlacesPanel={setPlacesPanel}
        setCurrentPlaces={setCurrentPlaces}
        currentPlaces={currentPlaces}
      />
      <RouteButton onClick={handleRoutePanel}>
        <FontAwesomeIcon icon={isClose || inputValue ? faClose : faRoute} />
      </RouteButton>
      <Button onClick={handleHide}>
        <FontAwesomeIcon
          style={isOpen ? {
            transform: 'rotate(118deg)',
            transition: 'all .2s linear',
            marginTop: '2px',
          }
            : { transform: 'rotate(-60deg)', transition: 'all .2s linear' }}
          icon={faArrowPointer}
        />
      </Button>
      <Wrapper style={isOpen ? { left: '0' } : { left: '-100%' }}>
        {routePanel && <RouteControl mapRef={mapRef} />}
        {!routePanel && placesPanel
      && <CurrentPlaces currentPlaces={currentPlaces} setIsClose={setIsClose} isClose={isClose} />}
        {!routePanel && !placesPanel && <MapCategory mapRef={mapRef} />}
      </Wrapper>
      <CurrentLocationControl mapRef={mapRef} />
    </div>
  );
}

export default MapY;
