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
            axios
              .post("/api/signup", { values, profileUrl: res_url })
              .then((res) => {
                if (res.data.success) {
                  axios.put(signedRequest, file, options).then(() => {
                    setTimeout(() => callback(), 1500);
                  });
                } else {
                  setTimeout(() => {
                    setLoading(false);
                    alert("Username already exists!");
                  }, 1500);
                }
              });
            //uploading to s3 bucket
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.message);
        });
    } else {
      axios.post("/api/signup", { values }).then((res) => {
        if (res.data.success) {
          setTimeout(() => callback(), 1500);
        } else {
          setTimeout(() => {
            setLoading(false);
            alert("Username already exists!");
          }, 1500);
        }
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
