import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useUserContext } from "@contexts/UserContext";
import { useAuthContext } from "@contexts/AuthContext";
import Loading from "@components/Loading";
import { Auth } from 'aws-amplify';
import "./login.css";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useUserContext();
  const { setAuth } = useAuthContext();
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const handleSubmit = async () => {
    if (username && password) {
      setLoading(true);
      // axios
      //   .post("/auth/api/login", { username: username, password: password })
      //   .then((res) => {
      //     if (res.data.success) {
      //       setTimeout(() => {
      //         setUser(res.data.user);
      //         setAuth(true);
      //         if (props.location.state !== undefined) {
      //           history.replace(props.location.state.prevPath);
      //         } else {
      //           history.replace("/");
      //         }
      //       }, 1500);
      //     } else {
      //       setTimeout(() => {
      //         setLoading(false);
      //         setErrorMessage("Username or Password is incorrect. Try Again.");
      //       }, 1500);
      //     }
      //   });
      const user = await Auth.signIn(username, password);
      console.log(user);
      // TODO: do the if-else statement in .then() function above.
      // You'll need to find out how you can check if the call succeeded or not.
    }
  };

  const handleForgotPassword = () => {
    if (username) {
      history.push("/resetpassword/" + username);
    } else {
      setErrorMessage("Please provide username.");
    }
  };

  return (
    <div
      className="full-plant-bg-login display-grid-center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/plant-bg.png"})`
      }}>

      <div className="form-login">
        {user && user.username}
        <h1 className="loginHeader">Login</h1>
        {loading ? (
          <div className="display-grid-center">
            <Loading />
          </div>
        ) : (
          <div>
            <p className="error-msg">{errorMessage}</p>

            <div className="login-inputs">
              <label htmlFor="username" className="login-label">
                Username
              </label>
              <input
                className="login-input"
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>

            <div className="login-inputs">
              <label htmlFor="password" className="login-label">
                Password
              </label>
              <input
                className="login-input"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="btn-container">
              <button className="login-input-btn" onClick={handleSubmit}>
                Login
              </button>
            </div>

            <div className="signup">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
            <div className="signup">
              <a onClick={handleForgotPassword} className="custom-links">
                Forgot Password?
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
