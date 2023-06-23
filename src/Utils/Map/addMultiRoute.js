const addMultiRoute = (mapRef, routeFrom, routeTo) => {
  const { ymaps } = window;
  const newMultiRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: [
      routeFrom,
      routeTo,
    ],
    params: {
      routingMode: 'masstransit',
    },
  }, {
    boundsAutoApply: true,
  });
  mapRef.current.geoObjects.add(newMultiRoute);
  return newMultiRoute;
};
export default addMultiRoute;
