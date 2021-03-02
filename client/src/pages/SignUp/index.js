import { useState } from "react";
import axios from "axios";

export default function SignUp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    if (validForm()) {
      axios
        .post("/api/signup", { username: username, password: password })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            props.history.push("/login");
          } else {
            setErrorMessage("Username already exists.");
          }
        });
    }
  };

  const validForm = () => {
    if (username && password) {
      if (username.length < 6 || password.length < 6) {
        setErrorMessage(
          "Username and Password must be longer than 6 characters."
        );
      } else if (username.indexOf(" ") >= 0) {
        setErrorMessage("Username must not contain white spaces.");
      } else {
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Sign Up</button>
    </div>
  );
}
