import { useState } from "react";
import axios from "axios";

export default function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("Email", email);
    if (email && password) {
      axios
        .post("/api/signup", { email: email, password: password })
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
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
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
