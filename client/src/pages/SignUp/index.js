import { useState } from "react";

import SignupForm from './SignupForm';
import SignupSuccess from './SignupSuccess';

export default function SignUp(props) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <div>
      {!isSubmitted ? (<SignupForm submitForm={submitForm}/>) : (<SignupSuccess/>)}
    </div>
  );
}