import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from 'store/slices/userSlice'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



import React from 'react'
import AuthForm from '../authForm/AuthForm';
import { writeUserData } from 'hooks/writeUserData';

function SignUp() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
  
    const handleRegistration = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
              localStorage.setItem('accessToken', user.accessToken);
              dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
              }))
              navigate("/");
            })
            .catch(console.error);
    }

  return (
    <AuthForm title="register"
    handleClick={handleRegistration}/>
  )
  
}

export default SignUp