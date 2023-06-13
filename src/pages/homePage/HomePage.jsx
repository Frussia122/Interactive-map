import React, { useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/slices/userSlice';
import { useAuth } from 'hooks/use-auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Map from 'components/map/Map'



import {setUser} from 'store/slices/userSlice'




function HomePage() {
  const { isAuth, token, userName } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
   let localAccessToken = localStorage.getItem('accessToken');

   if(localAccessToken) {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (token) {
        // Автоматическая аутентификация пользователя, если `accessToken` уже есть
        const accessToken = user.accessToken
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: accessToken,
            userName: user.displayName
          })
        )
      }
    });
    return () => unsubscribe();
  
   } else {
    navigate('/login')
   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);



  const map = useMemo(() => {
      if (isAuth) {
        return <Map />;
      } else {
        return null;
      }
  }, [isAuth]);

  return (
    <>
      <h1>Welcome</h1>

      {map}

      <Link to="/login" onClick={() => {
        localStorage.removeItem('accessToken');
        dispatch(removeUser());
      }}>Log Out from {userName}</Link>
    </>
  );
}

export default HomePage;