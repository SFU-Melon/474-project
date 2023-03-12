import React from 'react';
import { Link } from "react-router-dom";
import "./Signup.css";
const SignupSuccess = () => {
    return (
        <span class="login ">
            <h1>Account Verificiation<br />Please check your email inbox to verify your account</h1>.

            <img className="signupImage" src={process.env.PUBLIC_URL + '/signup.png'} />
            <Link to="/login"><p className="loginLink">Go back to login</p></Link>
        </span>
    )
}

export default SignupSuccess;