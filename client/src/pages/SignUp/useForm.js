import { useState, useEffect } from "react";
import axios from "axios";

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
    if (file) {
      axios
        .post("/api/profileUpload", {
          fileType: fileType,
        })
        .then((res) => {
          if (res.data.success) {
            const signedRequest = res.data.signedRequest;
            const res_url = res.data.url;
            const options = {
              headers: {
                "Content-Type": fileType,
              },
            };
            //uploading to s3 bucket
            axios.put(signedRequest, file, options).then(() => {
              console.log("Successfully uploaded.");
              axios
                .post("/api/signup", { values, profileUrl: res_url })
                .then((res) => {
                  if (res.data.success) {
                    callback();
                  } else {
                    alert("Username already exists!");
                  }
                  console.log("res: ", res.data.success);
                });
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
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

  return { handleChange, handleSubmit, handleFileChange, values, errors };
};

export default useForm;
