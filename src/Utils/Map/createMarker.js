const createMarker = (ymaps, mapRef, latitude, longitude) => {
  const placemark = new ymaps.Placemark([latitude, longitude], {
    hintContent: 'Местоположение',
    balloonContent: 'Вы находитесь тут',
  });
  mapRef.current.geoObjects.add(placemark);
};
export default createMarker;
