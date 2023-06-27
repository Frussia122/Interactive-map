import getPlaces from 'services/getPlaces';
import removeMarkers from './removeMarkers';

const { ymaps } = window;
const searchProvider = async (mapRef, inputValue, setCurrentPlaces, setPlacesPanel) => {
  const res = await getPlaces(inputValue, 0.1);

  removeMarkers(mapRef);
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
