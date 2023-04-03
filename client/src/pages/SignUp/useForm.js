import { useState, useEffect } from "react";
import { Auth } from 'aws-amplify';

const useForm = (callback, validateInfo) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    password2: "",
    fname: "",
    lname: "",
    dob: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const imageUrl = null;
      const { user } = await Auth.signUp({
        username: values.username,
        password: values.password,
        attributes: {// TODO: SHOULD DELETE THESE ATTRIBUTES
          email: values.email,
          picture: imageUrl ?? "",
          given_name: values.fname,
          family_name: values.lname,
          birthdate: values.dob
        },
        // autoSignIn: { // optional - enables auto sign in after user is confirmed
        //     enabled: true,
        // }
      });

      if (user) {
        setTimeout(() => callback({ ...values, profilephoto: imageUrl ?? "", password: undefined, password2: undefined, file }), 1500);
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        alert(error);
      }, 1500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      handleSignUp();
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    handleFileChange,
    values,
    errors,
    loading,
  };
};

export default useForm;
