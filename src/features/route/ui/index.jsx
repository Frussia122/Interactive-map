import React, { useState, useEffect } from 'react';
import { addSuggestView } from 'shared/utils/controls/addSuggestView';
import addMultiRoute from 'shared/utils/controls/addMultiRoute';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentMultiRouteCoords,
  setMultiRouteCoords,
} from 'shared/models/slices/controlsDataSlice';
import removeMarkers from 'shared/utils/controls/removeMarkers';

import {
  Wrapper,
} from './styled';
import { RouteInfo } from './routeInfo';
import { TypesButton } from 'entities/typesButton';
import { RouteInputs } from 'entities/routeInputs';
import { RouteButton } from 'entities/routeButton';

export const Route = ({ mapRef }) => {
  const [routeFromSuggest, setRouteFromSuggest] = useState('');
  const [routeToSuggest, setRouteToSuggest] = useState('');
  const [currentRoute, setCurrentRoute] = useState(null);
  const multiRouteCoords = useSelector(currentMultiRouteCoords);
  const dispatch = useDispatch();

  const { ymaps } = window;

  useEffect(() => {
    if (ymaps) {
      ymaps.ready(() => {
        setRouteFromSuggest(addSuggestView('routeFrom', 'yandex#map'));
        setRouteToSuggest(addSuggestView('routeTo', 'yandex#map'));
      });
    }
  }, []);

  useEffect(() => {
    if (multiRouteCoords) {
      removeMarkers(mapRef);
      const lng = localStorage.getItem('currentLongitude');
      const lat = localStorage.getItem('currentLatitude');
      setCurrentRoute(null);
      if (lat && lng) {
        setCurrentRoute(addMultiRoute(mapRef, [lat, lng], multiRouteCoords));
      }
    }
    dispatch(setMultiRouteCoords(null));
  }, [multiRouteCoords]);


  return (
    <Wrapper>
      <TypesButton currentRoute={currentRoute}/>
      <RouteInputs routeFromSuggest={routeFromSuggest} routeToSuggest={routeToSuggest} />
      <RouteButton mapRef={mapRef} setCurrentRoute={setCurrentRoute}/>
      {currentRoute && <RouteInfo currentRoute={currentRoute}/>}
    </Wrapper>
  );
}
