/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addSuggetstView, suggestEvent } from 'Utils/Map/addSuggestView';
import addMultiRoute from 'Utils/Map/addMultiRoute';

const Wrapper = styled.div`
margin-top: 100px;
`;

const Input = styled.input`
`;
const Button = styled.button`
`;

const TypeButton = styled.button`

`;
function RouteControl({ mapRef }) {
  const [routeFrom, setRouteFrom] = useState('');
  const [routeTo, setRouteTo] = useState('');
  const [routeFromSuggest, setRouteFromSuggest] = useState('');
  const [routeToSuggest, setRouteToSuggest] = useState('');
  const [multiRoute, setMultiRoute] = useState();

  const { ymaps } = window;

  useEffect(() => {
    if (ymaps) {
      ymaps.ready(() => {
        setRouteFromSuggest(addSuggetstView('routeFrom', 'yandex#map'));
        setRouteToSuggest(addSuggetstView('routeTo', 'yandex#map'));
      });
    }
  }, []);

  const handleRouteChange = (e, type) => {
    if (type === 'from') {
      setRouteFrom(e.target.value);
      suggestEvent(routeFromSuggest, setRouteFrom);
    } else if (type === 'to') {
      setRouteTo(e.target.value);
      suggestEvent(routeToSuggest, setRouteTo);
    }
  };

  const handleRouteClick = () => {
    const newMultiRoute = addMultiRoute(mapRef, routeFrom, routeTo);
    setRouteFrom('');
    setRouteTo('');
    setMultiRoute(newMultiRoute);
  };
  const handleChangeType = (type) => {
    if (multiRoute) {
      multiRoute.model.setParams({
        routingMode: type,
      });
    }
  };
  return (
    <Wrapper>
      <TypeButton onClick={() => handleChangeType('auto')}>Car</TypeButton>
      <TypeButton onClick={() => handleChangeType('pedestrian')}>Walking</TypeButton>
      <TypeButton onClick={() => handleChangeType('masstransit')}>Общественный транспорт</TypeButton>
      <TypeButton onClick={() => handleChangeType('bicycle')}>Велик</TypeButton>
      <Input
        value={routeFrom}
        onChange={(e) => handleRouteChange(e, 'from')}
        id="routeFrom"
        placeholder="От куда?"
      />
      <Input
        value={routeTo}
        onChange={(e) => handleRouteChange(e, 'to')}
        id="routeTo"
        placeholder="Куда?"

      />
      <Button onClick={handleRouteClick}> as</Button>
    </Wrapper>
  );
}

export default RouteControl;
