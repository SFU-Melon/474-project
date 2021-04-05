import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "@contexts/UserContext";
import "./reset.css";

export default function ResetPassword(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const { user, setUser } = useUserContext();
  const { token, username } = props.match.params;

  const conditionalRender = () => {
    if (token) {
      return (
        <div>
          <p className="error-msg">{errorMessage}</p>
          <div className="reset-inputs">
            <label htmlFor="username" className="reset-label">
              Password
            </label>
            <input
              className="reset-input"
              type="password"
              name="password"
              placeholder="New Password"
              onChange={(e) => {
                setPassword(e.target.value);
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
              name="confirmpassword"
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>

          <div className="btn-container">
            <button className="reset-input-btn" onClick={handleReset}>
              Reset Password
            </button>
          </div>
        </div>
      );
    } else if (email) {
      return (
        <div>
          <h4>An email is sent to {email}.</h4>
          <button>Resend</button>
        </div>
      );
    } else {
      return (
        <div>
          <h4>Sorry, no email found for {username}.</h4>
        </div>
      );
    }
  };

  const handleReset = async () => {
    try {
      if (password || confirmPassword) {
        if (password === confirmPassword) {
          const res = await axios.post(`/api/resetPassword/${username}`, {
            token,
            password,
          });
          if (res.data.success) {
            props.history.push("/login");
          }
        } else if (password.length < 8 || confirmPassword.length < 8) {
          setErrorMessage("Password needs to be at least 8 characters.");
        } else {
          setErrorMessage("Passwords don't match.");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendEmail = async () => {
    try {
      const res = await axios.get(`/api/resetPasswordRequest/${username}`);
      if (res.data.success) {
        setEmail(res.data.email);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(props);
    if (token) {
    } else {
      sendEmail();
    }
  }, []);

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
        <h1 className="resetHeader">Reset Password</h1>
        {conditionalRender()}
        <div className="signup">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
