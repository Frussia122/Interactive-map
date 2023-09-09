import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button } from './styled';
import {
    setRouteTo,
    setRouteFrom,
    currentRouteFrom,
    currentRouteTo
  } from 'shared/models/slices/controlsDataSlice';
import addMultiRoute from 'shared/utils/controls/addMultiRoute';

export const RouteButton = ({ mapRef,setCurrentRoute }) => {
    const routeFrom = useSelector(currentRouteFrom);
    const routeTo = useSelector(currentRouteTo);
    const [routeError, setRouteError] = useState(null);
    const dispatch = useDispatch();
    const handleRouteClick = () => {
        if (routeFrom && routeTo) {
          setCurrentRoute(addMultiRoute(mapRef, routeFrom, routeTo, setRouteError));
          dispatch(setRouteFrom(''));
          dispatch(setRouteTo(''));
        }
      };

    return (
        <Button onClick={handleRouteClick}>Проложить маршрут</Button>
    );
};

