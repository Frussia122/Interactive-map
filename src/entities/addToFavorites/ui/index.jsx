
import React from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'shared/styled/styled';
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import db from 'app/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorite, addToFavorite } from 'shared/models/slices/favoritesSlice';
import { currentUser } from 'shared/models/slices/userSlice';

export const AddToFavorites = ({ properties, geometry }) => {

  const dispatch = useDispatch();
  const uid = useSelector(currentUser);
  const favorites = useSelector((state) => state.favorite.favorites);
  const place = {
    id: properties.CompanyMetaData.id,
    name: properties.name,
    description: properties.description,
    coords: geometry.coordinates,
  };

  const handleAddFavorites = async () => {
    const existingPlace = favorites.find((fav) => fav.id === place.id);

    if (existingPlace) {
      try {
        const favoritesRef = collection(db, `${uid}`);
        const querySnapshot = await getDocs(query(favoritesRef, where('place.id', '==', existingPlace.id)));
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        dispatch(removeFromFavorite(existingPlace));
      } catch (e) {
        console.error('Error removing document: ', e);
      }
    } else {
      try {
        await addDoc(collection(db, `${uid}`), {
          place,
        });
        dispatch(addToFavorite(place));
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };

  return (
    <Button onClick={handleAddFavorites}>
      <FontAwesomeIcon icon={faStar} />
    </Button>
  );
}

