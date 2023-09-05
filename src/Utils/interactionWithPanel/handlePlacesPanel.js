const handlePlacesPanel = (
  multiRoute,
  setMultiRoute,
  setIsOpen,
) => {
  setIsOpen(true);
  if (multiRoute) {
    multiRoute.model.setReferencePoints([]);
    setMultiRoute(null);
  }
};
export default handlePlacesPanel;
