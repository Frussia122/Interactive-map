const handlePlacesPanel = (
  setIsClose,
  isClose,
  multiRoute,
  setMultiRoute,
  setRoutePanel,
  setPlacesPanel,
) => {
  setIsClose(!isClose);
  if (multiRoute) {
    multiRoute.model.setReferencePoints([]);
    setMultiRoute(null);
  }
  setRoutePanel(false);
  setPlacesPanel(false);
};
export default handlePlacesPanel;
