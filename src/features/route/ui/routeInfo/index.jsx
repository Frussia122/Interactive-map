import React, { useState, useEffect } from 'react';
import duck from 'shared/PreLoaders/duck.gif';
import {
  Wrapper,
  Routes,
  RoutesItem,
  Content,
  Duration,
  Distance,
  Preloader,
} from './styled';

export const RouteInfo = ({ currentRoute }) => {

  const [routeData, setRouteData] = useState([]);
  const [activeRoute, setActiveRoute] = useState(null);

  useEffect(() => {
    if (currentRoute) {
      currentRoute.model.events.add('requestsuccess', () => {
        const routes = currentRoute.getRoutes().toArray();
        const data = routes.map((route) => ({
          distance: route.properties.get('distance').text,
          duration: route.properties.get('duration').text,
          routeObject: route,
        }));
        console.log(data);
        setRouteData(data);
        setActiveRoute(data[0]);
      });
    }
  }, [currentRoute]);

  const handleRouteClick = (route) => {
    currentRoute.setActiveRoute(route.routeObject);
    setActiveRoute(route);
  };

  return (
    <Wrapper>
      {routeData.length > 0 ? (
        <Routes>
          {routeData.map((route) => (
            <RoutesItem
              type="button"
              key={route.distance + route.duration}
              onClick={() => handleRouteClick(route)}
              className={route === activeRoute ? 'activeRoute' : ''}
            >
              <Content>
                <Duration>
                  {route.duration}
                </Duration>
                <Distance>
                  {route.distance}
                </Distance>
              </Content>
            </RoutesItem>
          ))}
        </Routes>
      ) : (
        <Preloader src={duck} alt="preloader" />
      )}
    </Wrapper>
  );
}
