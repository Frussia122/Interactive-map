import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser, setUser } from 'store/slices/userSlice';
import useAuth from 'hooks/use-auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import MapY from 'components/map/Map';
import Button from './styled';

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
      <MapY isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button
        className="logOut"
        style={isOpen
          ? { left: '120px' } : { left: '-100%' }}
        to="/login"
        onClick={() => {
          localStorage.removeItem('accessToken');
          dispatch(removeUser());
        }}
      >
        Log Out
      </Button>
    </>
  );
}

export default HomePage;
