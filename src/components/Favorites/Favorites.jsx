/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  onSnapshot,
} from 'firebase/firestore';
import db from 'firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, removeFromFavorite, clearFavorites } from 'store/slices/favoritesSlice';

function Favorites({ userId }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.favorites);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const unsubscribe = subscribeToData();

    return () => {
      unsubscribe();
    };
  }, [userId]);

  const readData = async () => {
    const querySnapshot = await getDocs(collection(db, `${userId}`));
    querySnapshot.forEach((doc) => {
      dispatch(addToFavorite(doc.data().place));
    });
  };

  useEffect(() => {
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
  }, [userId]);

  return (
    <div className="asdasd">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        favorites.map((place) => (
          <div key={place.id}>
            <p>{place.name}</p>
            <p>{place.address}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;
