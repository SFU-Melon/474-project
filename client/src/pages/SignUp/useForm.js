import { useState, useEffect } from "react";
import axios from "axios";
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
  const [fileType, setFileType] = useState("");
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
      const parts = e.target.files[0].name.split(".");
      const type = parts[parts.length - 1];
      setFile(e.target.files[0]);
      setFileType(type);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    const currentConfig = Auth.configure();
    console.log("CURRENT CONFIG: ", currentConfig);
    if (file) {
      // TODO: work on image upload later. This api is not migrated.
      axios
        .post("/image/api/profileUpload", {
          fileType: fileType,
        })
        .then(async (res) => {
          if (res.data.success) {
            const signedRequest = res.data.signedRequest;
            const res_url = res.data.url;
            const options = {
              headers: {
                "Content-Type": fileType,
              },
            };
            const { user } = await Auth.signUp({
              username: values.username,
              password: values.password,
              attributes: {// TODO: SHOULD DELETE THESE ATTRIBUTES
                email: values.email,
                picture: res_url,
                given_name: values.fname,
                family_name: values.lname,
                birthdate: values.dob
              },
              // autoSignIn: { // optional - enables auto sign in after user is confirmed
              //     enabled: true,
              // }
            });
            console.log(user);
            console.log(user);
            if (user) {
              setTimeout(() => callback({...values, profilephoto: res_url}), 1500);
            }
            // TODO:
            // The app does not have a page to verify a user atm. 
            // I think the easiest way for now is configure the Cognito to send the email link not verification code.


            // axios
            //   .post("/auth/api/signup", { values, profileUrl: res_url })
            //   .then((res) => {
            //     if (res.data.success) {
            //       axios.put(signedRequest, file, options).then(() => {
            //         setTimeout(() => callback(), 1500);
            //       });
            //     } else {
            //       setTimeout(() => {
            //         setLoading(false);
            //         alert("Username already exists!");
            //       }, 1500);
            //     }
            //   });
            //uploading to s3 bucket

          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.message);
        });
    } else {
      // TODO work on this.
      try {
        const { user } = await Auth.signUp({
          username: values.username,
          password: values.password,
          attributes: { // TODO: SHOULD DELETE THESE ATTRIBUTES
            email: values.email,
            given_name: values.fname,
            family_name: values.lname,
            birthdate: values.dob
          },
          // autoSignIn: { // optional - enables auto sign in after user is confirmed
          //     enabled: true,
          // }
        });
        console.log(user);
        if (user) {
          setTimeout(() => callback(values), 1500);
        }
      } catch (err) {
        setTimeout(() => {
          setLoading(false);
          alert(err);
        }, 1500);
      }
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
