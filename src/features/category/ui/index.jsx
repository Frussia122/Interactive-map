import React from 'react';
import categories from '../data/categories';

import { CategoriesWrapper } from './styled';
import { SingleCategory } from 'entities/singleCategory';

export const Category = ({ mapRef }) => {
  return (
    <CategoriesWrapper>
      {categories.map((category) => (
        <SingleCategory mapRef={mapRef} key={category.id} data={category} />
      ))}
    </CategoriesWrapper>
  );
}
