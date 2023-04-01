import React from 'react';
import { Link } from "react-router-dom";
import "./Signup.css";
const SignupSuccess = () => {
    return (
        <span className="login ">
            <h1>Success!<br />Your account's been created</h1>.

            <img className="signupImage" src={process.env.PUBLIC_URL + '/signup.png'} />
            <Link to="/login"><p className="loginLink">Go back to login</p></Link>
        </span>
    )
}

export default SignupSuccess;