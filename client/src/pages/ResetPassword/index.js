import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useUserContext } from "@contexts/UserContext";
import "./reset.css";

export default function ResetPassword(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useUserContext();
  let history = useHistory();

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/plant-bg.png"})`,
        height: "95.7vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="form">
        {user && user.username}
        <h1 className="resetHeader">Reset Password</h1>
        <p className="error-msg">{errorMessage}</p>

        <div className="reset-inputs">
          <label htmlFor="username" className="reset-label">
            Password
          </label>
          <input
            className="reset-input"
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="reset-inputs">
          <label htmlFor="password" className="reset-label">
            Confirm Password
          </label>
          <input
            className="reset-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>

        <div className="btn-container">
          <button className="reset-input-btn">Reset Password</button>
        </div>

        <div className="signup">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
