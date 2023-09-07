const handlePlacesPanel = (
  multiRoute,
  setIsOpen,
) => {
  setIsOpen(true);
  if (multiRoute) {
    multiRoute.model.setReferencePoints([]);
  }
};
export default handlePlacesPanel;
