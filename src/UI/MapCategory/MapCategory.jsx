/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import searchProvider from 'Utils/Map/searchProvider';
import categories from './categories';

export const CategoriesWrapper = styled.ul`
  margin-top: 100px;
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #2196F3;
  padding: 20px;
  background-color: white;
  max-width: 350px;
  z-index:50;
  gap: 5px 0px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;
export const CategorieItem = styled.li`
    cursor: pointer;
    text-align: center;
    list-style: none;
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    flex-direction: column-reverse;
    svg{
      font-size: 25px;

    }
`;

function MapCategory({ mapRef }) {
  const handleChoosenPlaces = (query) => {
    searchProvider(mapRef, query);
  };
  return (
    <CategoriesWrapper>
      {categories.map((category) => (
        <CategorieItem
          onClick={() => handleChoosenPlaces(category.query)}
          key={category.id}
        >
          <span>{category.title}</span>
          <div style={{
            background: `${category.color}`,
            color: 'white',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <FontAwesomeIcon icon={category.icon} />
          </div>
        </CategorieItem>
      ))}
    </CategoriesWrapper>
  );
}

export default MapCategory;
