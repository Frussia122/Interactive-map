/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import searchProvider from 'Utils/Controls/searchProvider';
import { addSuggetstView, suggestEvent } from 'Utils/Controls/addSuggestView';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { MapYContext } from 'components/map/MapContext';

import {
  Wrapper,
  Form,
  Input,
  Button,
} from './styled';

function SearchControl({ mapRef, setIsOpen }) {
  const {
    inputValue,
    setInputValue,
    setPlacesPanel,
    setCurrentPlaces,
    setRoutePanel,
  } = useContext(MapYContext);

  const [currentSuggest, setCurrentSuggest] = useState('');

  const { ymaps } = window;

  const handleSearch = () => {
    if (inputValue) {
      setIsOpen(true);
      searchProvider(
        mapRef,
        inputValue,
        setCurrentPlaces,
        setPlacesPanel,
        '',
        '',
      );
      setInputValue('');
    }
  };

  useEffect(() => {
    if (ymaps) {
      ymaps.ready(() => {
        setCurrentSuggest(addSuggetstView('suggest', 'yandex#search'));
      });
    }
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    suggestEvent(currentSuggest, setInputValue);
  };

  return (
    <Wrapper>
      <Form id="form">
        <Input
          placeholder="Поиск мест и адресов"
          value={inputValue}
          onChange={(e) => handleChange(e)}
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
