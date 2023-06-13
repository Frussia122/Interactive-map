import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from 'store/slices/userSlice'
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";



import React from 'react'
import AuthForm from '../authForm/AuthForm';



function SignUp() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
  
    const handleRegistration = (email, password, userName) => {
        const auth = getAuth();
        
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
              console.log(user)
              localStorage.setItem('accessToken', user.accessToken);
              dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
              }))
              updateProfile(auth.currentUser, {
                displayName: userName,
              })
              .then(() => {
                navigate("/");
              })
              .catch((error) => {
                console.log(error)
              });

              navigate("/");
            })
            .catch(console.error);
            

  
    }

  return (
    <AuthForm title="Create Account"
    handleClick={handleRegistration}
    type="registration"/>
  )
  
}

export default SignUp