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
import { RouteButton, Button, Wrapper } from './styled';

function MapY() {
  const [isOpen, setIsOpen] = useState(true);
  const [routePanel, setRoutePanel] = useState(false);
  const [inputValue, setInputValue] = useState('');
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
    } else {
      setIsOpen(true);
      setRoutePanel(!routePanel);
    }
  };

  return (
    <div
      id="map"
      ref={mapRef}
    >
      <SearchControl mapRef={mapRef} inputValue={inputValue} setInputValue={setInputValue} />
      <RouteButton onClick={handleRoutePanel}>
        <FontAwesomeIcon icon={routePanel || inputValue ? faClose : faRoute} />
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
        {routePanel
          ? <RouteControl mapRef={mapRef} />
          : <MapCategory mapRef={mapRef} />}
      </Wrapper>
      <CurrentLocationControl mapRef={mapRef} />
    </div>
  );
}

export default MapY;
