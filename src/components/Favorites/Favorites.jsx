/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from 'react';
import {
  collection,
  getDocs,
  query,
  onSnapshot,
} from 'firebase/firestore';
import db from 'firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, removeFromFavorite, clearFavorites } from 'store/slices/favoritesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import searchProvider from 'Utils/Controls/searchProvider';
import { MapYContext } from 'components/map/MapContext';
import duck from 'assets/PreLoaders/duck.gif';
import {
  Button,
  Wrapper,
  Place,
  Name,
  Address,
  Empty,
} from './styled';

function Favorites({ userId, mapRef, setIsOpen }) {
  const {
    setPlacesPanel,
    setCurrentPlaces,
  } = useContext(MapYContext);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.favorites);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorites, setIsFavorites] = useState(true);

  const handleDataChange = (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const { place } = change.doc.data();

      if (change.type === 'added') {
        dispatch(addToFavorite(place));
      } else if (change.type === 'removed') {
        dispatch(removeFromFavorite(place));
      }
    });
  };

  const subscribeToData = () => {
    const favoritesRef = collection(db, `${userId}`);
    const favoritesQuery = query(favoritesRef);
    const unsubscribe = onSnapshot(favoritesQuery, handleDataChange);
    return unsubscribe;
  };

  const readData = async () => {
    const querySnapshot = await getDocs(collection(db, `${userId}`));
    querySnapshot.forEach((doc) => {
      dispatch(addToFavorite(doc.data().place));
    });
  };

  useEffect(() => {
    const unsubscribe = subscribeToData();
    setIsLoading(true);
    dispatch(clearFavorites());
    readData()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
        setIsLoading(false);
      });
    return () => {
      unsubscribe();
    };
  }, [userId]);

  const handleClick = () => {
    setIsFavorites(!isFavorites);
  };

  const handleSearch = (inputValue, name) => {
    setIsFavorites(!isFavorites);
    setIsOpen(true);
    searchProvider(mapRef, inputValue, setCurrentPlaces, setPlacesPanel, 'filter', name);
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
                <Place type="button" onClick={() => handleSearch(place.name, place.description)} key={place.id}>
                  <Name>{place.name}</Name>
                  <Address>{place.description}</Address>
                </Place>
              ))
            )}
          </div>
        ) : <Empty>В ваше избранное еще ничего не добавлено</Empty>}
      </Wrapper>

    </>
  );
}

export default Favorites;
