// import { useState } from "react";
// import axios from "axios";
import Form from './SignupForm';

export default function SignUp(props) {

  // const handleSubmit = () => {
  //   if (validForm()) {
  //     axios
  //       .post("/api/signup", { username: username, password: password })
  //       .then((res) => {
  //         console.log(res);
  //         if (res.data.success) {
  //           props.history.push("/login");
  //         } else {
  //           setErrorMessage("Username already exists.");
  //         }
  //       });
  //   }
  // };

  return (
    <div>
      <Form/>
    </div>
  );
}