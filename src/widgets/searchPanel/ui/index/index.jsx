import React, { useEffect, useState } from 'react';
import { addSuggestView } from 'shared/utils/controls/addSuggestView';
import {
  Wrapper,
  Form,
} from './styled';
import { SearchButton } from 'entities/searchButton';
import { SearchInput } from 'features/searchInput';

export const SearchPanel = ({ mapRef, setIsOpen }) => {
  const { ymaps } = window;
  const [currentSuggest, setCurrentSuggest] = useState('');

  useEffect(() => {
    if (ymaps) {
      ymaps.ready(() => {
        setCurrentSuggest(addSuggestView('suggest', 'yandex#search'));
      });
    }
  }, []);

  return (
    <Wrapper>
      <Form id="form">
        <SearchInput currentSuggest={currentSuggest}/>
        <SearchButton mapRef={mapRef} setIsOpen={setIsOpen} />
      </Form>
    </Wrapper>
  );
}