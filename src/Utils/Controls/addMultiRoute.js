const addMultiRoute = (mapRef, routeFrom, routeTo) => {
  const { ymaps } = window;
  const multiRoutes = [];

  // Удаление предыдущих маршрутов
  mapRef.current.geoObjects.each((geoObject) => {
    if (geoObject instanceof ymaps.multiRouter.MultiRoute) {
      mapRef.current.geoObjects.remove(geoObject);
    }
  });

  // Создание нового маршрута
  const newMultiRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: [
      routeFrom,
      routeTo,
    ],
    params: {
      routingMode: 'auto',
    },
  }, {
    boundsAutoApply: true,
  });

  // Добавление нового маршрута на карту и сохранение его в массиве multiRoutes
  mapRef.current.geoObjects.add(newMultiRoute);
  multiRoutes.push(newMultiRoute);

  console.log(multiRoutes);
  return newMultiRoute;
};

export default addMultiRoute;
