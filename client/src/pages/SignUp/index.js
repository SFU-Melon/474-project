import { useState, useRef } from "react";
import SignupForm from "./SignupForm";
import SignupSuccess from "./SignupSuccess";
import SignupVerification from "./SignupVerification";

export default function SignUp(props) {
  const SIGN_UP_FORM="sign-up-form"
  const VERIFY_REGISTRATION="verify-registration"
  const SIGN_UP_SUCCESS = "sign-up-success"
  const [selectedView, setSelectedView] = useState(SIGN_UP_FORM)
  const previousFormData = useRef()

  const formCallback = (values) =>{
    previousFormData.current = values;
    setSelectedView(VERIFY_REGISTRATION)
  }

  const navigateToSuccessCallback = () =>{
    setSelectedView(SIGN_UP_SUCCESS)
  }

  const navigateToFormCallback = () =>{
    setSelectedView(SIGN_UP_FORM)
  }

  function renderSelectedView() {
    switch (selectedView) {
      case SIGN_UP_FORM:
        return <SignupForm formCallback={formCallback} />
      case VERIFY_REGISTRATION:
        return <SignupVerification username={previousFormData.current} navigateToFormCallback={navigateToFormCallback} navigateToSuccessCallback={navigateToSuccessCallback}/>
      case SIGN_UP_SUCCESS:
        return <SignupSuccess />
    }
  }

  return (
    <div
      className="full-plant-bg-signup display-grid-center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/plant-bg.png"})`
      }}>
      <div className="form-signup">
        {renderSelectedView()}
      </div>
    </div>
  );
}
