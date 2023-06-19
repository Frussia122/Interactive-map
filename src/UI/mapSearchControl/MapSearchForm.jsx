/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';

import createMarkers from 'utils/mapUtils/createMarkers';

import handleSearchPlaces from 'utils/searchCotrol/handleSearchPlaces';
import React, { useState, useEffect } from 'react';
import getPlaces from 'services/getPlaces';
import MapSearchCategory from './MapSearchCategory';
import { SearchForm, SearchInput, SearchButton } from './styled';

function MapSearchForm({ mapRef }) {
  const [searchValue, setSearchValue] = useState('');
  const [currentPlaces, setCurrentPlaces] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(async () => {
      const places = await getPlaces(searchValue, 0.028);
      places.forEach((item) => console.log(item));
    }, 2000);
    setTimeoutId(newTimeoutId);
  };

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
          onChange={handleInputChange}
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
