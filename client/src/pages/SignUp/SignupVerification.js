import React from 'react';
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { axiosApiInstance } from '../../utils/axiosConfig';
import "./Signup.css";

const SignupVerification = ({ values, navigateToFormCallback, navigateToSuccessCallback }) => {
    const [code, setCode] = React.useState("");

    const handleChange = (e) => {
        setCode(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            const result = await Auth.confirmSignUp(values.username, code);
            console.log("VALUES: ",values)
            const response = await axiosApiInstance.post(`/user/api/createUser`, {
                ...values
            });
        
            console.log(result, "RESULT");
            console.log(response, "labmda response")
            navigateToSuccessCallback();
        } catch (error) {
            console.log("err", error);
            alert(error)
        }

    }

    return (
        <span class="login ">
            <h1>Account Verificiation<br />Please check your email inbox and enter your verfication code here.</h1>
            <div className="signup-inputs">
                <label htmlFor="password" className="signup-label">
                    Verification Code
                </label>
                <input
                    type="code"
                    name="code"
                    className="signup-input"
                    placeholder="Enter your code"
                    value={code}
                    onChange={handleChange}
                />
            </div>
            <div className="btn-container">
                <button className="signup-input-btn" onClick={handleSubmit}>
                    Next
                </button>
            </div>
            {/* 
            <img className="signupImage" src={process.env.PUBLIC_URL + '/signup.png'} /> */}
            <Link onClick={navigateToFormCallback}><p className="loginLink">Go back to sign up form</p></Link>
        </span>
    )
}

export default SignupVerification;