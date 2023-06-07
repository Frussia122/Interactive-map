import SignIn from 'components/signIn/SignIn'
import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'

function LoginPage() {
  return (
    <Fragment> 
        <h1>Login</h1>
        <SignIn/>
        <p>
            or <Link to='/register'>Sign up</Link>
        </p>
    </Fragment>
  )
}

export default LoginPage