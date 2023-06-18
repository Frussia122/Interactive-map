/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';

import createMarkers from 'utils/mapUtils/createMarkers';

import handleSearchPlaces from 'utils/searchCotrol/handleSearchPlaces';
import React, { useState, useEffect } from 'react';
import MapSearchCategory from './MapSearchCategory';
import { SearchForm, SearchInput, SearchButton } from './styled';

function MapSearchForm({ mapRef }) {
  const [searchValue, setSearchValue] = useState('');
  const [currentPlaces, setCurrentPlaces] = useState([]);

  useEffect(() => {
    if (currentPlaces.length !== 0) {
      createMarkers(mapRef, currentPlaces);
    }
  }, [currentPlaces, mapRef]);

  return (
    <>
      <SearchForm>
        <SearchInput
          placeholder="Поиск мест и адресов"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <SearchButton onClick={(e) => handleSearchPlaces(e, searchValue, setCurrentPlaces)}>
          <FontAwesomeIcon icon={faSearchLocation} />
        </SearchButton>
      </SearchForm>
      <MapSearchCategory
        handleSearchPlaces={handleSearchPlaces}
        setCurrentPlaces={setCurrentPlaces}
        setSearchValue={setSearchValue}
      />
    </>
  );
}

export default MapSearchForm;
