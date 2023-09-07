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
  addMultiRoute,
) => {
  removeMarkers(mapRef);
  const lng = localStorage.getItem('currentLongitude');
  const lat = localStorage.getItem('currentLatitude');
  let currentRoute = null;

  if (lat && lng) {
    currentRoute = addMultiRoute(mapRef, [lat, lng], coords);
  }
  return currentRoute;
};
