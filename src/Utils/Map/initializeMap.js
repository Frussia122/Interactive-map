// import currentLocationControl from 'UI/currentLocationControl/currentLocationControl';
// import routeControl from 'UI/routeControl/routeControl';

function initializeMap(ymaps, latitude, longitude) {
  const myMap = new ymaps.Map('map', {
    center: [latitude, longitude],
    zoom: 16,
    controls: [],
  });

  // routeControl(myMap);

  // currentLocationControl(ymaps, myMap);

  return myMap;
}

export default initializeMap;
