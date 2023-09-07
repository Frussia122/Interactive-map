/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect, useContext } from 'react';
import { addSuggestView, suggestEvent } from 'Utils/Controls/addSuggestView';
import addMultiRoute from 'Utils/Controls/addMultiRoute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RouteInfo from 'components/RouteInfo/RouteInfo';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMultiRoute,
  currentMultiRoute,
  currentRouteFrom,
  currentRouteTo,
  setRouteTo,
  setRouteFrom,
} from 'store/slices/controlsDataSlice';
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
  const [localRouteTo, setLocalRouteTo] = useState('');
  const [localRouteFrom, setLocalRouteFrom] = useState('');
  const [routeFromSuggest, setRouteFromSuggest] = useState('');
  const [routeToSuggest, setRouteToSuggest] = useState('');
  const [activeType, setActiveType] = useState(routeTypes[0].type);
  const [routeError, setRouteError] = useState(null);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const multiRoute = useSelector(currentMultiRoute);
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
      const newMultiRoute = addMultiRoute(mapRef, routeFrom, routeTo, setRouteError);
      dispatch(setRouteFrom(''));
      dispatch(setRouteTo(''));
      // console.log(newMultiRoute[0].model);
      // dispatch(setMultiRoute(newMultiRoute[0].model));
    }
  };

  const handleType = (type) => {
    if (multiRoute) {
      setActiveType(type);
      multiRoute.model.setParams({
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
      {multiRoute && <RouteInfo />}
    </Wrapper>
  );
}

export default RouteControl;
