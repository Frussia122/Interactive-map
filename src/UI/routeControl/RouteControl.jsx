/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addSuggetstView, suggestEvent } from 'Utils/Map/addSuggestView';

const Wrapper = styled.div`
`;

const Input = styled.input`
`;
const Button = styled.button`
`;

const Car = styled.button`

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

  const handleRouteFromChange = (e) => {
    setRouteFrom(e.target.value);
    suggestEvent(routeFromSuggest, setRouteFrom);
  };

  const handleRouteToChange = (e) => {
    setRouteTo(e.target.value);
    suggestEvent(routeToSuggest, setRouteTo);
  };

  const handleRouteClick = () => {
    const newMultiRoute = new ymaps.multiRouter.MultiRoute({
      referencePoints: [
        routeFrom,
        routeTo,
      ],
      params: {
        routingMode: 'masstransit',
      },
    }, {
      boundsAutoApply: true,
    });
    mapRef.current.geoObjects.add(newMultiRoute);
    setRouteFrom('');
    setRouteTo('');
    setMultiRoute(newMultiRoute);
  };
  const handleChangeType = (type) => {
    multiRoute.model.setParams({
      routingMode: type,
    });
  };
  return (
    <Wrapper>
      <Car onClick={() => handleChangeType('auto')}>Car</Car>
      <Input
        value={routeFrom}
        onChange={(e) => handleRouteFromChange(e)}
        id="routeFrom"
        placeholder="От куда?"
      />
      <Input
        value={routeTo}
        onChange={(e) => handleRouteToChange(e)}
        id="routeTo"
        placeholder="Куда?"

      />
      <Button onClick={handleRouteClick}> as</Button>
    </Wrapper>
  );
}

export default RouteControl;
