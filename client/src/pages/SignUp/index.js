import { useState } from "react";

import SignupForm from "./SignupForm";
import SignupSuccess from "./SignupSuccess";

export default function SignUp(props) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <div
      className="full-plant-bg-signup display-grid-center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/plant-bg.png"})`
      }}>
      <div className="form-signup">
        {!isSubmitted ? (
          <SignupForm submitForm={submitForm} />
        ) : (
          <SignupSuccess />
        )}
      </div>
    </div>
  );
}
