import getPlaces from 'services/getPlaces';
import removeMarkers from './removeMarkers';

const { ymaps } = window;

// eslint-disable-next-line max-len
const searchProvider = async (mapRef, inputValue, setCurrentPlaces, setPlacesPanel, filter, Filtername) => {
  const res = await getPlaces(inputValue, 0.1);

  removeMarkers(mapRef);
  console.log(inputValue);
  if (res) {
    let filteredPlaces = res;

    if (filter === 'filter' && inputValue) {
      filteredPlaces = res.filter((feature) => {
        const { properties } = feature;
        const { name, description } = properties;
        return (
          (name && name === inputValue)
          && (description === Filtername)
        );
      });
    }

    filteredPlaces.forEach((feature) => {
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

    if (filter === 'filter' && inputValue && filteredPlaces.length > 0) {
      setCurrentPlaces(filteredPlaces[0]); // Возвращаем первый найденный объект
    }

    setCurrentPlaces(filteredPlaces);
    setPlacesPanel(true);
  }

  return null; // Возвращаем null, если не найдено совпадений или не передан фильтр
};

export default searchProvider;
