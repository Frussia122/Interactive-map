/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import searchProvider from 'Utils/Map/searchProvider';
import { addSuggetstView, suggestEvent } from 'Utils/Map/addSuggestView';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { MapYContext } from 'components/map/MapContext';

const Wrapper = styled.div`
  position: absolute;
  top:0;
  left: 0;
  z-index:1007;
`;
const Form = styled.form`
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid transparent;
  transition: border-color 0.2s ease-in-out;

  &.focused {
    border-color: #0c8ce9;
  }
`;

const Input = styled.input`
  padding: 15px 20px;
  width: 200px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: none;
  background-color: #f6f6f6;
  outline: none;
  font-size: 14px;
`;

const Button = styled.button`
  height: 48px;
  width: 48px;
  margin: 0;
  border: none;
  background-color: #f6f6f6;
  font-size: 20px;
  cursor: pointer;
  color: black;
  transition: all .2s linear;
  border-left: 1px solid #c9c9c9;
  border-right: 1px solid #c9c9c9;
  &:hover{
    color: red;
  }
`;

function SearchControl({ mapRef }) {
  const {
    inputValue,
    setInputValue,
    setPlacesPanel,
    setCurrentPlaces,
  } = useContext(MapYContext);

  const [currentSuggest, setCurrentSuggest] = useState('');

  const { ymaps } = window;

  const handleSearch = () => {
    searchProvider(mapRef, inputValue, setCurrentPlaces, setPlacesPanel);
    setInputValue('');
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
