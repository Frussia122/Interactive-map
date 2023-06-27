/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import searchProvider from 'Utils/Controls/searchProvider';
import categories from './categories';

import { CategoriesWrapper, CategorieItem } from './styled';

function MapCategory({ mapRef, setCurrentPlaces, setPlacesPanel }) {
  const handleChoosenPlaces = (query) => {
    searchProvider(mapRef, query, setCurrentPlaces, setPlacesPanel);
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
