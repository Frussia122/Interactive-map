/* eslint-disable no-else-return */
// eslint-disable-next-line consistent-return
const addMultiRoute = (mapRef, routeFrom, routeTo) => {
  const { ymaps } = window;
  const multiRoutes = [];

  mapRef.current.geoObjects.each((geoObject) => {
    if (geoObject instanceof ymaps.multiRouter.MultiRoute) {
      mapRef.current.geoObjects.remove(geoObject);
    }
  });

  const newMultiRoute = new ymaps.multiRouter.MultiRoute(
    {
      referencePoints: [routeFrom, routeTo],
      params: {
        routingMode: 'auto',
      },
    },
    {
      boundsAutoApply: true,
    },
  );

  mapRef.current.geoObjects.add(newMultiRoute);
  multiRoutes.push(newMultiRoute);
  console.log(multiRoutes);
  return newMultiRoute;
};

export default addMultiRoute;
