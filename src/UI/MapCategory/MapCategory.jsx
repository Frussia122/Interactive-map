/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import searchProvider from 'Utils/Controls/searchProvider';
import { useDispatch } from 'react-redux';
import { setPlacesPanel } from 'store/slices/controlsSlice';
import categories from './categories';

import { CategoriesWrapper, CategoryItem } from './styled';

function MapCategory({ mapRef }) {
  const dispatch = useDispatch();

  const handleChosenPlaces = (query) => {
    dispatch(setPlacesPanel(true));
    searchProvider(mapRef, query, dispatch);
  };
  return (
    <CategoriesWrapper>
      {categories.map((category) => (
        <CategoryItem
          onClick={() => handleChosenPlaces(category.query)}
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
        </CategoryItem>
      ))}
    </CategoriesWrapper>
  );
}

export default MapCategory;
