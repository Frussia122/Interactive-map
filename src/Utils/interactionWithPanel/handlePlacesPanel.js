const handlePlacesPanel = (
  setIsClose,
  isClose,
  multiRoute,
  setMultiRoute,
  setRoutePanel,
  setPlacesPanel,
  setIsOpen,
) => {
  setIsClose(!isClose);
  setIsOpen(true);
  if (multiRoute) {
    multiRoute.model.setReferencePoints([]);
    setMultiRoute(null);
  }
  setRoutePanel(false);
  setPlacesPanel(false);
};
export default handlePlacesPanel;
