import React, { useEffect, useContext, useState } from 'react';
import { MapYContext } from 'components/map/MapContext';
import styled from 'styled-components';

const Wrapper = styled.div`
margin-top: 20px;
`;

const Routes = styled.ul`
margin: 0;
padding: 0;
`;

const RoutesItem = styled.li`
    transition: all 0.2s linear;
    list-style: none;
    padding: 20px 15px;
    cursor: pointer;
    border-bottom: 1px solid #f6f6f6;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Duration = styled.span`
    font-weight: semi-bold;
    font-size: 20px;
    margin-right: 10px;
`;

const Distance = styled.span`
    font-size: 20px;
`;

function RouteInfo() {
  const { multiRoute } = useContext(MapYContext);
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
        <p>Загрузка данных маршрута...</p>
      )}
    </Wrapper>
  );
}

export default RouteInfo;
