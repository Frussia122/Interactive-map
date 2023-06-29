import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser, setUser } from 'store/slices/userSlice';
import useAuth from 'hooks/use-auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { MapYProvider } from 'components/map/MapContext';

import MapY from 'components/map/Map';

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useAuth();
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
  }, [token]);

  return (
    <>
      <MapYProvider>
        <MapY isOpen={isOpen} setIsOpen={setIsOpen} />
      </MapYProvider>
      <Link
        className="logOut"
        style={isOpen
          ? { left: '80px' } : { left: '-100%' }}
        to="/login"
        onClick={() => {
          localStorage.removeItem('accessToken');
          dispatch(removeUser());
        }}
      >
        Log Out
      </Link>
    </>
  );
}

export default HomePage;
