/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useRef,
  useContext,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowPointer, faClose, faRoute } from '@fortawesome/free-solid-svg-icons';

import initializeMap from 'Utils/Map/initializeMap';
import getCurrentPosition from 'Utils/Map/getCurrentPosition';
import createMarker from 'Utils/Map/createMarker';
import SearchControl from 'UI/serachControl/SearchControl';
import CurrentLocationControl from 'UI/currentLocationControl/CurrentLocationControl';
import Controls from 'components/Controls/Controls';
import handlePlacesPanel from 'Utils/interactionWithPanel/handlePlacesPanel';
import removeMarkers from 'Utils/Controls/removeMarkers';
import Favorites from 'components/Favorites/Favorites';
import useAuth from 'hooks/use-auth';
import { useSelector, useDispatch } from 'react-redux';
import {
  currentPlacesPanel, currentIsClose, currentRoutePanel, setPlacesPanel, setIsClose, setRoutePanel,
} from 'store/slices/controlsSlice';
import {
  currentInputValue,
  AllPlaces,
  setInputValue,
} from 'store/slices/controlsDataSlice';

import { MapYContext } from './MapContext';

import { RouteButton, Button } from './styled';

function MapY({ isOpen, setIsOpen }) {
  const {
    uid,
    setUid,
  } = useContext(MapYContext);

  const dispatch = useDispatch();

  const placesPanel = useSelector(currentPlacesPanel);
  const routePanel = useSelector(currentRoutePanel);
  const isClose = useSelector(currentIsClose);
  const inputValue = useSelector(currentInputValue);
  const currentPlaces = useSelector(AllPlaces);

  const { id } = useAuth();
  useEffect(() => {
    setUid(id);
  }, [id]);

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
            throw new Error(error);
          });
      });
    }
  }, [ymaps]);

  const handleHide = () => {
    setIsOpen(!isOpen);
  };

  const handleRoutePanel = () => {
    removeMarkers(mapRef);
    if (inputValue) {
      setIsOpen(true);
      dispatch(setInputValue(''));
    } else if (placesPanel) {
      mapRef.current.geoObjects.each((geoObject) => {
        if (geoObject instanceof ymaps.multiRouter.MultiRoute) {
          mapRef.current.geoObjects.remove(geoObject);
        }
      });
      dispatch(setIsClose(!isClose));
      dispatch(setRoutePanel(false));
      dispatch(setPlacesPanel(false));
    } else {
      setIsOpen(true);
      dispatch(setRoutePanel(!routePanel));
      dispatch(setIsClose(!isClose));
    }
  };

  return (
    <div
      id="map"
      ref={mapRef}
    >
      <SearchControl
        setIsOpen={setIsOpen}
        mapRef={mapRef}
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
      <Controls mapRef={mapRef} isOpen={isOpen} />
      <CurrentLocationControl mapRef={mapRef} />
      {uid && <Favorites setIsOpen={setIsOpen} userId={id} mapRef={mapRef} />}
    </div>
  );
}

export default MapY;
