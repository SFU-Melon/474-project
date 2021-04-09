import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useForm from "./useForm";
import validateInfo from "./validateInfo";
import "./Signup.css";

const SignupForm = ({ submitForm }) => {
  const [numOfUsers, setNumOfUsers] = useState();
  const {
    handleChange,
    handleSubmit,
    handleFileChange,
    values,
    errors,
  } = useForm(submitForm, validateInfo);

  const fetchNumOfUsers = async () => {
    try {
      const res = await axios.get("api/getTotalAmountOfUsers");
      if (res.data.success) {
        setNumOfUsers(res.data.numofusers);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNumOfUsers();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/plant-bg.png"})`,
        height: "96vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit} className="form" noValidate>
        <h1 className="signUpHeader">Sign up</h1>
        <p className="text-center fs-4"> Join {numOfUsers} Users</p>
        <div className="signup-inputs">
          <label htmlFor="username" className="signup-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="signup-input"
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
          />

          {errors.username && <p className="error-msg">{errors.username}</p>}
        </div>

        <div className="signup-inputs">
          <label htmlFor="password" className="signup-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="signup-input"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
          />

          {errors.password && <p className="error-msg">{errors.password}</p>}
        </div>

        <div className="signup-inputs">
          <label htmlFor="password2" className="signup-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="password2"
            className="signup-input"
            placeholder="Re-enter your password"
            value={values.password2}
            onChange={handleChange}
          />

          {errors.password2 && <p className="error-msg">{errors.password2}</p>}
        </div>

        <div className="signup-inputs">
          <label htmlFor="fname" className="signup-label">
            First Name
          </label>
          <input
            type="fname"
            name="fname"
            className="signup-input"
            placeholder="Enter your first name"
            value={values.fname}
            onChange={handleChange}
          />

          {errors.fname && <p className="error-msg">{errors.fname}</p>}
        </div>

        <div className="signup-inputs">
          <label htmlFor="lname" className="signup-label">
            Last Name
          </label>
          <input
            type="lname"
            name="lname"
            className="signup-input"
            placeholder="Enter your last name"
            value={values.lname}
            onChange={handleChange}
          />

          {errors.lname && <p className="error-msg">{errors.lname}</p>}
        </div>

        <div className="signup-inputs">
          <label htmlFor="dob" className="signup-label">
            Date of Birth
          </label>
          <input
            type="dob"
            name="dob"
            className="signup-input"
            placeholder="DD/MM/YYYY"
            value={values.dob}
            onChange={handleChange}
          />

          {errors.dob && <p className="error-msg">{errors.dob}</p>}
        </div>

        <div className="signup-inputs">
          <label htmlFor="email" className="signup-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="signup-input"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          />

          {errors.email && <p className="error-msg">{errors.email}</p>}
        </div>

        <div className="signup-inputs">
          <label htmlFor="file" className="signup-label">
            Profile Picture
          </label>
          <input
            type="file"
            name="file"
            className="form-control"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
        </div>

        <div class="btn-container">
          <button className="signup-input-btn" type="submit">
            Sign Up
          </button>
        </div>

        <div class="login">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
