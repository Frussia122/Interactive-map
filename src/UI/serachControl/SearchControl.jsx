/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import searchProvider from 'Utils/Controls/searchProvider';
import { addSuggestView, suggestEvent } from 'Utils/Controls/addSuggestView';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setRoutePanel, currentPlacesPanel, setPlacesPanel } from 'store/slices/controlsSlice';
import { currentInputValue, setInputValue } from 'store/slices/controlsDataSlice';
import {
  Wrapper,
  Form,
  Input,
  Button,
} from './styled';

function SearchControl({ mapRef, setIsOpen }) {
  const [localValue, setLocalValue] = useState('');
  const [currentSuggest, setCurrentSuggest] = useState('');
  const { ymaps } = window;
  const dispatch = useDispatch();
  const inputValue = useSelector(currentInputValue);
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    if (ymaps) {
      ymaps.ready(() => {
        setCurrentSuggest(addSuggestView('suggest', 'yandex#search'));
      });
    }
  }, []);

  const handleSearch = () => {
    if (inputValue) {
      setIsOpen(true);
      dispatch(setPlacesPanel(true));
      searchProvider(
        mapRef,
        inputValue,
        dispatch,
        '',
        '',
      );
      dispatch(setInputValue(''));
    }
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    clearTimeout(debounceTimer);

    setDebounceTimer(setTimeout(() => {
      suggestEvent(currentSuggest, dispatch, setInputValue, 1000, setSearchTerm);
      dispatch(setInputValue(value));
    }, 1000));
  };

  return (
    <Wrapper>
      <Form id="form">
        <Input
          placeholder="Поиск мест и адресов"
          value={searchTerm}
          onChange={handleInputChange}
          id="suggest"
        />
        <Button type="button" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearchLocation} />
        </Button>
      </Form>
    </Wrapper>
  );
}

export default SearchControl;
