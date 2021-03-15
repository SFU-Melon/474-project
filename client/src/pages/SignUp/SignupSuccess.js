import React from 'react';
import { Link } from "react-router-dom";


const SignupSuccess = () => {
    return (
        <div>
            <span class="login">
                Success. <Link to="/login">Go back to Login</Link>
            </span>
        </div>
    )
}

export default SignupSuccess;