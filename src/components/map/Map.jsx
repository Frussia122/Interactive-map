
import React, {
  useEffect,
  useRef,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowPointer, faClose, faRoute } from '@fortawesome/free-solid-svg-icons';
import initializeMap from 'shared/utils/map/initializeMap';
import getCurrentPosition from 'shared/utils/map/getCurrentPosition';
import createMarker from 'shared/utils/map/createMarker';
import removeMarkers from 'shared/utils/controls/removeMarkers';
import { Controls } from 'widgets/controls';
import { SearchPanel } from 'widgets/searchPanel';
import { Favorites } from 'widgets/favorites';
import { LocationButton } from 'features/location';
import useAuth from 'shared/hooks/use-auth';
import { useSelector, useDispatch } from 'react-redux';
import { 
  currentPlacesPanel, 
  currentIsClose, 
  currentRoutePanel, 
  setPlacesPanel, 
  setIsClose, 
  setRoutePanel,
} from 'shared/models/slices/controlsSlice';
import { currentUser } from 'shared/models/slices/userSlice';
import {
  currentInputValue,
  AllPlaces,
  setInputValue,
} from 'shared/models/slices/controlsDataSlice';

import { RouteButton, Button } from './styled';



function MapY({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();

  const placesPanel = useSelector(currentPlacesPanel);
  const routePanel = useSelector(currentRoutePanel);
  const isClose = useSelector(currentIsClose);
  const inputValue = useSelector(currentInputValue);
  const uid = useSelector(currentUser);

  const { id } = useAuth();

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
      <SearchPanel
        setIsOpen={setIsOpen}
        mapRef={mapRef}
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
      <LocationButton mapRef={mapRef} />

      {uid && <Favorites setIsOpen={setIsOpen} mapRef={mapRef} />}
  
    </div>
  );
}

export default MapY;
