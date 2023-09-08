/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect, useContext } from 'react';
import { addSuggestView, suggestEvent } from 'Utils/Controls/addSuggestView';
import addMultiRoute from 'Utils/Controls/addMultiRoute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RouteInfo from 'components/RouteInfo/RouteInfo';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentMultiRouteCoords,
  currentRouteFrom,
  currentRouteTo,
  setRouteTo,
  setRouteFrom,
  setMultiRouteCoords,
} from 'store/slices/controlsDataSlice';
import removeMarkers from 'Utils/Controls/removeMarkers';
import routeInputs from './routeInputs';

import routeTypes from './routeTypes';
import {
  Wrapper,
  TypeButton,
  Input,
  Button,
  TypesWrapper,
  InputWrapper,
} from './styled';

function RouteControl({ mapRef }) {
  const routeFrom = useSelector(currentRouteFrom);
  const routeTo = useSelector(currentRouteTo);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [localRouteTo, setLocalRouteTo] = useState('');
  const [localRouteFrom, setLocalRouteFrom] = useState('');
  const [routeFromSuggest, setRouteFromSuggest] = useState('');
  const [routeToSuggest, setRouteToSuggest] = useState('');
  const [activeType, setActiveType] = useState(routeTypes[0].type);
  const [routeError, setRouteError] = useState(null);
  const [debounceTimer, setDebounceTimer] = useState(null);
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

  const handleRouteChange = (e, type) => {
    const { value } = e.target;
    if (type === 'from') {
      setLocalRouteFrom(e.target.value);
    } else if (type === 'to') {
      setLocalRouteTo(e.target.value);
    }
    clearTimeout(debounceTimer);

    setDebounceTimer(setTimeout(() => {
      if (type === 'from') {
        suggestEvent(routeFromSuggest, dispatch, setRouteFrom, 300, setLocalRouteFrom);
        dispatch(setRouteFrom(value));
      } else if (type === 'to') {
        suggestEvent(routeToSuggest, dispatch, setRouteTo, 300, setLocalRouteTo);
        dispatch(setRouteTo(value));
      }
    }, 500));
  };

  const handleRouteClick = () => {
    if (routeFrom && routeTo) {
      setCurrentRoute(addMultiRoute(mapRef, routeFrom, routeTo, setRouteError));
      dispatch(setRouteFrom(''));
      dispatch(setRouteTo(''));
    }
  };

  const handleType = (type) => {
    if (currentRoute) {
      setActiveType(type);
      currentRoute.model.setParams({
        routingMode: type,
      });
    }
  };

  return (
    <Wrapper>
      <TypesWrapper>
        {routeTypes.map((type) => (
          <TypeButton
            key={type.id}
            onClick={(e) => handleType(type.type, e)}
            className={type.type === activeType ? 'activeType' : ''}
          >
            <FontAwesomeIcon
              icon={type.icon}
              className={type.type === activeType ? 'active' : ''}
            />
          </TypeButton>
        ))}
      </TypesWrapper>
      <InputWrapper>
        {routeInputs.map((input) => (
          <Input
            value={input.id === 'routeTo' ? localRouteTo : localRouteFrom}
            onChange={(e) => handleRouteChange(e, input.type)}
            id={input.id}
            key={input.id}
            placeholder={input.placeholder}
          />
        ))}
      </InputWrapper>
      <Button onClick={handleRouteClick}>Проложить маршрут</Button>
      {currentRoute && <RouteInfo currentRoute={currentRoute} />}
    </Wrapper>
  );
}

export default RouteControl;
