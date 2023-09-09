import getPlaces from 'shared/api/getPlaces';
import { setPlacesPanel } from 'shared/models/slices/controlsSlice';
import { setCurrentPlaces } from 'shared/models/slices/controlsDataSlice';
import removeMarkers from './removeMarkers';

const { ymaps } = window;

const searchProvider = async (
  mapRef,
  inputValue,
  dispatch,
  filter,
  Filtername,
) => {
  dispatch(setCurrentPlaces([]));
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
      dispatch(setCurrentPlaces(filteredPlaces[0]));
    }
    dispatch(setCurrentPlaces(filteredPlaces));
  }
  dispatch(setPlacesPanel(true));
  return null;
};

export default searchProvider;
