import React, { useEffect, useState } from 'react';
import duck from 'assets/PreLoaders/duck.gif';
import { useSelector } from 'react-redux';
import { currentMultiRoute } from 'store/slices/controlsDataSlice';
import {
  Wrapper,
  Routes,
  RoutesItem,
  Content,
  Duration,
  Distance,
  Preloader,
} from './styled';

function RouteInfo() {
  const multiRoute = useSelector(currentMultiRoute);
  const [routeData, setRouteData] = useState([]);
  const [activeRoute, setActiveRoute] = useState(null);

  useEffect(() => {
    if (multiRoute) {
      multiRoute.model.events.add('requestsuccess', () => {
        const routes = multiRoute.getRoutes().toArray();
        const data = routes.map((route) => ({
          distance: route.properties.get('distance').text,
          duration: route.properties.get('duration').text,
          routeObject: route,
        }));

        setRouteData(data);
        setActiveRoute(data[0]);
      });
    }
  }, [multiRoute]);

  const handleRouteClick = (route) => {
    multiRoute.setActiveRoute(route.routeObject);
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

export default RouteInfo;
