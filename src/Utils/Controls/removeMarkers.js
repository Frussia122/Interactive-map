const removeMarkers = (mapRef) => {
  const markersToRemove = [];
  mapRef.current.geoObjects.each((geoObject) => {
    const hintContent = geoObject.properties.get('hintContent');
    if (hintContent !== 'Местоположение') {
      markersToRemove.push(geoObject);
    }
  });
  markersToRemove.forEach((marker) => {
    mapRef.current.geoObjects.remove(marker);
  });
};
export default removeMarkers;
