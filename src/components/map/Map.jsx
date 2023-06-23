import React, { useEffect, useRef, useState } from 'react';
import initializeMap from 'Utils/Map/initializeMap';
import getCurrentPosition from 'Utils/Map/getCurrentPosition';
import createMarker from 'Utils/Map/createMarker';
import SearchControl from 'UI/serachControl/SearchControl';
import MapCategory from 'UI/MapCategory/MapCategory';
import styled from 'styled-components';
import CurrentLocationControl from 'UI/currentLocationControl/CurrentLocationControl';
import { faArrowPointer, faClose, faRoute } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RouteControl from 'UI/routeControl/RouteControl';

const Wrapper = styled.div`
  background: white;
  height: 100vh;
  width: 400px;
  z-index: 1005;
  top: 0;
  left: 0;
  position: absolute;
  transition: all 0.2s linear;
`;
const Button = styled.button`
  position: absolute;
  z-index: 1006;
  height: 30px;
  width: 25px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: #A5A5A5;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: #4d4d4d;
  left: 367px;
  cursor: pointer;
  top: 30px;
  transition: all 0.1s linear;

  &:hover{
    color: white;
  }
`;

const RouteButton = styled.button`
    position: absolute;
    height: 48px;
    z-index: 1010;
    left: 309px;
    top: 21.5px;
    width: 48px;
    margin: 0;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border: none;
    background-color: #f6f6f6;
    font-size: 20px;
    cursor: pointer;
    color: black;
    transition: all .2s linear;
`;
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
