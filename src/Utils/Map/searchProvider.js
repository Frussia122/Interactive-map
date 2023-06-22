import getPlaces from 'services/getPlaces';

const { ymaps } = window;
const searchProvider = async (mapRef, inputValue) => {
  const res = await getPlaces(inputValue, 0.2);

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
        balloonContent: `${name} ${description}`,
      }, {
        preset: 'islands#dotIcon',
        iconColor: '#735184',
      });
      mapRef.current.geoObjects.add(placemark);
    });
  }
};

export default searchProvider;
