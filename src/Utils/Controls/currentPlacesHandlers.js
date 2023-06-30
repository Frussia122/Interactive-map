export const handlePanToLocation = (coords, mapRef) => {
  mapRef.current.geoObjects.each((geoObject) => {
    // eslint-disable-next-line no-underscore-dangle
    if (geoObject.geometry._coordinates === coords) {
      geoObject.balloon.open();
      mapRef.current.setCenter(coords);
    }
  });
};

export const handleRoute = (
  coords,
  mapRef,
  removeMarkers,
  setMultiRoute,
  addMultiRoute,
  setRoutePanel,
  routePanel,
  setIsClose,
) => {
  removeMarkers(mapRef);
  const lng = localStorage.getItem('currentLongitude');
  const lat = localStorage.getItem('currentLatitude');
  if (lat && lng) {
    const currentRoute = addMultiRoute(mapRef, [lat, lng], coords);
    setMultiRoute(currentRoute);
    setRoutePanel(!routePanel);
    setIsClose(true);
  }
};
