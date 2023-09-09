import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearFavorites,
} from 'shared/models/slices/favoritesSlice';
import { FavoritePlace } from 'entities/favoritePlace';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import duck from 'shared/PreLoaders/duck.gif';
import { currentUser } from 'shared/models/slices/userSlice';
import {
  Button,
  Wrapper,
  Empty,
} from './styled';
import { readFavorites } from 'shared/utils/Favorites/readFavorites';

export const Favorites = ({ setIsOpen, mapRef }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.favorites);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorites, setIsFavorites] = useState(true);
  const userId = useSelector(currentUser);


  useEffect(() => {
    setIsLoading(true);
    dispatch(clearFavorites());
    readFavorites(dispatch, userId)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [userId]);

  const handleClick = () => {
    setIsFavorites(!isFavorites);
  };

  return (
    <>
      <Button type="button" onClick={handleClick}>
        <FontAwesomeIcon icon={faBookmark} />
      </Button>
      <Wrapper className={`${isFavorites ? 'activeFavorites' : ''}`}>
        {favorites.length > 0 ? (
          <div>
            {isLoading ? (
              <img src={duck} alt="asd" />
            ) : (
              favorites.map((place) => (
                 <FavoritePlace 
                 place ={place} 
                 setIsFavorites={setIsFavorites}
                 setIsOpen={setIsOpen}
                 mapRef={mapRef}
                 />
              ))
            )}
          </div>
        ) : <Empty>У вас нет избранных</Empty>}
      </Wrapper>
    </>
  );
}

