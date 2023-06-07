import React, { Fragment } from 'react'
import {Link} from 'react-router-dom';
import SignUp from '../../components/signUp/SignUp';

function RegisterPage() {
  return (
    <Fragment>
        <h1>Register</h1>

        <SignUp />
        <p>
            Already have an account? <Link to="/login"> Sign In</Link>
        </p>
    </Fragment>
  )
}

export default RegisterPage