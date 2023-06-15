import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import getPlaces from 'services/getPlaces';
import createMarkers from "utils/mapUtils/createMarkers";

import { useState, useEffect } from 'react';

const SearchForm = styled.form`
    position: absolute;
    z-index: 20;
    top: 5px;
    right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SearchInput = styled.input`
    height:34px;
    outline: none;
    border:none;
    font-size: 15px;
    padding-left: 15px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

`;

const SearchButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 35px;
    cursor: pointer;
    font-size: 18px;
    background-color: white;
    border: none;
    color: gray;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    transition: all 0.5s linear;
    &:hover{
        color: black;
    }
  
  
`;

function MapSearchForm({ mapRef }) {
    const [searchValue, setSearchValue] = useState('');
    const [currentPlaces, setCurrentPlaces] = useState([]);
  
    useEffect(() => {
      if (currentPlaces.length !== 0) {
        createMarkers(mapRef, currentPlaces);
      }
    }, [currentPlaces, mapRef]);
  
    const handleClick = async (e) => {
      e.preventDefault();
  
      if (searchValue) {
        try {
          const places = await getPlaces(searchValue);
          setCurrentPlaces(places);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('No search');
      }
    };
  
    return (
      <SearchForm>
        <SearchInput placeholder='Поиск мест и адресов' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        <SearchButton onClick={handleClick}>
          <FontAwesomeIcon icon={faSearchLocation} />
        </SearchButton>
      </SearchForm>
    );
  }
  
export default MapSearchForm;