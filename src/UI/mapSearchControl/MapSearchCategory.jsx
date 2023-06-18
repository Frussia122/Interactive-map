/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import categories from './categories';
import { CategoriesWrapper, CategorieItem } from './styled';

function MapSearchCategory({
  handleSearchPlaces,
  setCurrentPlaces,
  setSearchValue,
}) {
  const handleChoosenPlaces = (query, e, requestQuery) => {
    handleSearchPlaces(e, requestQuery, setCurrentPlaces);
    setSearchValue(query);
  };

  return (
    <CategoriesWrapper>
      {categories.map((category) => (
        <CategorieItem
          onClick={(e) => handleChoosenPlaces(category.query, e, category.query)}
          key={category.id}
        >
          <span>{category.title}</span>
          <div style={{
            background: `${category.color}`,
            color: 'white',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
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

export default MapSearchCategory;
