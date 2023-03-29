import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "@components/Loading";
import useLocalStorage from "@hooks/useLocalStorage";
import "./styles.css";
import { axiosApiInstance } from "../../utils/axiosConfig";

export default function ResetPassword(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useLocalStorage("email", "");
  const [loading, setLoading] = useState(true);
  const [emailSent, setEmailSent] = useLocalStorage("email-sent", false); // keep track of first email sent [Optimization]
  const { token, username } = props.match.params;
  const [resend, setResend] = useState(false);

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

          <div className="display-grid-center">
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
          <div className="display-grid-center">
            <button disabled={!resend} onClick={sendEmail}>
              Resend
            </button>
          </div>
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
      if (password.length < 8 || confirmPassword.length < 8) {
        setErrorMessage("Password needs to be at least 8 characters.");
      } else {
        if (password === confirmPassword) {
          const res = await axiosApiInstance.post(`/auth/api/resetPassword/${username}`, {
            token,
            password,
          });
          if (res.data.success) {
            props.history.push("/login");
          } else {
            alert("Token expired");
            props.history.push("/");
          }
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
      setResend(false);
      const res = await axiosApiInstance.get(`/auth/api/resetPasswordRequest/${username}`);
      if (res.data.success) {
        setEmail(res.data.email);
      }
      setTimeout(() => {
        setLoading(false);
        setEmailSent(true);
      }, 2000);
      setTimeout(() => setResend(true), 60 * 1000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      setLoading(false);
      setEmailSent(false);
    } else if (!emailSent) {
      sendEmail();
    }
    return () => {
      localStorage.removeItem("cmpt354-email-sent");
      localStorage.removeItem("cmpt354-email");
    };
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
        <h1 className="resetHeader">
          {loading ? "Sending Email..." : "Reset Password"}
        </h1>
        <div className="display-grid-center">
          {loading ? <Loading /> : conditionalRender()}
        </div>
        <div className="signup">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
