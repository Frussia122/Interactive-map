import {
  getDatabase,
  ref,
  set,
  onValue,
} from 'firebase/database';

function useFirebaseDatabase() {
  const db = getDatabase();
  const writeUserData = (userId, places) => {
    set(ref(db, `users/${userId}`), {
      favoritesPlaces: places,
    });
  };

  const getData = (userId, callback) => {
    const dbRef = ref(db, `users/${userId}/favoritesPlaces`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
  };

  return { writeUserData, getData };
}

export default useFirebaseDatabase;
