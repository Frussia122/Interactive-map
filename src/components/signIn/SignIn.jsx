
import {useDispatch} from 'react-redux'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom'

import {setUser} from 'store/slices/userSlice'
import AuthForm from '../authForm/AuthForm';




function SignIn() {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleLogin = (email, password) => {
        const auth = getAuth();
        
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
              localStorage.setItem('accessToken', user.accessToken);
              dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
              }))
              navigate("/");
            })
            .catch(() => alert('Invalid user'))
    }

   

  return (
    <AuthForm 
    title="Sign In"
    handleClick={handleLogin}/>
  )
  
}

export default SignIn