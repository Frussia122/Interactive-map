  import { collection, getDocs } from 'firebase/firestore';
  import db from 'app/firebaseConfig';

import { setFavorite } from 'shared/models/slices/favoritesSlice';

export const readFavorites = async (dispatch, userId) => {
    const querySnapshot = await getDocs(collection(db, `${userId}`));
    const allFavorites = [];
    querySnapshot.docs.forEach((doc) => {
      allFavorites.push(doc.data().place);
    });
    dispatch(setFavorite(allFavorites));
  };