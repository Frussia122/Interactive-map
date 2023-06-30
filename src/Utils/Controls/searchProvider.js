import getPlaces from 'services/getPlaces';
import removeMarkers from './removeMarkers';

const { ymaps } = window;

// eslint-disable-next-line max-len
const searchProvider = async (
  mapRef,
  inputValue,
  setCurrentPlaces,
  setPlacesPanel,
  filter,
  Filtername,
) => {
  setPlacesPanel(true);
  setCurrentPlaces([]);
  const res = await getPlaces(inputValue, 0.1);

  removeMarkers(mapRef);
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
      setCurrentPlaces(filteredPlaces[0]);
    }
    setCurrentPlaces(filteredPlaces);
  }

  return null;
};

export default searchProvider;
