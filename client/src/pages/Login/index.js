import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (username && password) {
      axios
        .post("/api/login", { username: username, password: password })
        .then((res) => {
          if (res.data.success) {
            props.history.push("/");
          }
          console.log("res: ", res.data.success);
        });
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
      <button onClick={handleSubmit}>Login</button>
      <Link to="/signup">SIGN UP </Link>
    </div>
  );
}
