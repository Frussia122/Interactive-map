export const addSuggetstView = (id, provider) => {
  const { ymaps } = window;
  const suggestView = new ymaps.SuggestView(id, { provider, boundedBy: [[30, 40], [50, 50]] });
  return suggestView;
};

export const suggestEvent = (suggestView, callBack) => {
  suggestView.events.add('select', (e) => {
    const selectedItem = e.get('item');
    const selectedValue = selectedItem.value;
    callBack(selectedValue);
  });
};
