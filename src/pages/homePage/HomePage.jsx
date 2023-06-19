import React, { useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser, setUser } from 'store/slices/userSlice';
import useAuth from 'hooks/use-auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Map from 'components/map/Map';

function HomePage() {
  const { isAuth, token, userName } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const localAccessToken = localStorage.getItem('accessToken');

    if (localAccessToken) {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user && user.accessToken) {
          const { accessToken } = user;
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: accessToken,
              userName: user.displayName,
            }),
          );
        } else {
          navigate('/login');
        }
      });
      unsubscribe();
    } else {
      navigate('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const map = useMemo(() => {
    if (isAuth) {
      return <Map />;
    } return null;
  }, [isAuth]);

  return (
    <>
      {map}

      <Link
        to="/login"
        onClick={() => {
          localStorage.removeItem('accessToken');
          dispatch(removeUser());
        }}
      >
        Log Out from
        {userName}
      </Link>
    </>
  );
}

export default HomePage;
