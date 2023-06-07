import React, { useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/slices/userSlice';
import { useAuth } from 'hooks/use-auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';

import {setUser} from 'store/slices/userSlice'




function HomePage() {
  const { isAuth, email, token, userName } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (token) {
        // Автоматическая аутентификация пользователя, если `accessToken` уже есть
        const accessToken = user.accessToken;
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: accessToken,
            userName: user.displayName
          })
        );
      }
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return isAuth ? (
    <div>
      <h1>Welcome</h1>

      <Link to="/login" onClick={() =>{
        localStorage.removeItem('accessToken');
        dispatch(removeUser())
      }}>Log Out from {userName}</Link>
    </div>
  ) : (
    <Navigate to="/login" replace={true} />
  );
}

export default HomePage;