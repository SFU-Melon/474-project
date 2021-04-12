import React from 'react';
import { Link } from "react-router-dom";
import "./Signup.css";
const SignupSuccess = () => {
    return (
        <div
            className="full-plant-bg display-grid-center"
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + "/plant-bg.png"})`,
                height: "100vh",
            }}>

            <form class="form2">

                <span class="login ">
                    <h1>Success!<br />Your account's been created</h1>.

                    <img className="signupImage" src={process.env.PUBLIC_URL + '/signup.png'} />
                    <Link to="/login"><p className="loginLink">Go back to login</p></Link>
                </span>
            </form>
        </div>

    )
}

export default SignupSuccess;