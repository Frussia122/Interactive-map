/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import searchProvider from 'Utils/Map/searchProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';

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
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border: none;
  background-color: #f6f6f6;
  font-size: 20px;
  cursor: pointer;
  color: black;
  transition: all .2s linear;

  &:hover{
    color: red;
  }
`;

function SearchControl({ mapRef }) {
  const [inputValue, setInputValue] = useState('');

  const { ymaps } = window;

  const handleSearch = () => {
    searchProvider(mapRef, inputValue);
    setInputValue('');
  };

  useEffect(() => {
    if (ymaps) {
      ymaps.ready(() => {
        const suggestView = new ymaps.SuggestView('suggest', { provider: 'yandex#search' });
        suggestView.events.add('select', (e) => {
          const selectedItem = e.get('item');
          const selectedValue = selectedItem.value;
          setInputValue(selectedValue);
        });
        return () => {
          suggestView.destroy(); // Очистка ресурсов при размонтировании компонента
        };
      });
    }
  }, []);

  const handleInputFocus = () => {
    const form = document.getElementById('form');
    form.classList.add('focused');
  };

  const handleInputBlur = () => {
    const form = document.getElementById('form');
    form.classList.remove('focused');
  };

  return (
    <Wrapper>
      <Form id="form">
        <Input
          placeholder="Поиск мест и адресов"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          id="suggest"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <Button type="button" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearchLocation} />
        </Button>
      </Form>
    </Wrapper>
  );
}

export default SearchControl;
