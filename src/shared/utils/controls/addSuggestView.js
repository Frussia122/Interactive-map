export const addSuggestView = (id, provider) => {
  const { ymaps } = window;
  const suggestView = new ymaps.SuggestView(id, { provider, boundedBy: [[30, 40], [50, 50]] });
  return suggestView;
};

export const suggestEvent = (
  suggestView,
  dispatch,
  setInputValue,
  debounceTime,
  setter,
) => {
  let debounceTimer;

  suggestView.events.add('select', (e) => {
    const selectedItem = e.get('item');
    const selectedValue = selectedItem.value;
    setter(selectedValue);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      dispatch(setInputValue(selectedValue));
    }, debounceTime);
    return selectedValue;
  });
};
