import getPlaces from 'services/getPlaces';

const { ymaps } = window;
const searchProvider = async (mapRef, inputValue, setCurrentPlaces, setPlacesPanel) => {
  const res = await getPlaces(inputValue, 0.02);

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

  if (res) {
    res.forEach((feature) => {
      const { geometry, properties } = feature;
      const { coordinates } = geometry;
      coordinates.reverse();
      const { name, description } = properties;
      const placemark = new ymaps.Placemark(coordinates, {
        hintContent: `${name}`,
        balloonContentHeader: `${name}`,
        balloonContentBody: `${description}`,
      }, {
        preset: 'islands#circleIcon',
        iconColor: 'red',
      });
      mapRef.current.geoObjects.add(placemark);
    });
    setCurrentPlaces(res);
    setPlacesPanel(true);
  }
};

export default searchProvider;
