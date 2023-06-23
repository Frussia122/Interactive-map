function initializeMap(ymaps, latitude, longitude) {
  const myMap = new ymaps.Map('map', {
    center: [latitude, longitude],
    zoom: 16,
    controls: [],
  });

  return myMap;
}

export default initializeMap;
