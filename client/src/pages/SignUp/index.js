import { useState } from "react";
import axios from "axios";

export default function SignUp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("username: ", username);
    if (username && password) {
      axios
        .post("/api/signup", { username: username, password: password })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            props.history.push("/login");
          } else {
            console.log("failed");
          }
        });
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
