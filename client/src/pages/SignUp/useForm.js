import { useState, useEffect } from "react";
import axios from "axios";
const useForm = (callback, validateInfo) => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        password2: '',
        fname: '',
        lname: '',
        dob: '',
        email: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        setErrors(validateInfo(values));
        setIsSubmitting(true);
    };

    useEffect(
        () => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                axios
                .post("/api/signup", values)
                .then((res) => {
                  if (res.data.success) {
                      callback();
                  } else {
                    alert("Username already exists!");
                  }
                  console.log("res: ", res.data.success);
                });
            }
        },
        [errors]
    );

    return { handleChange, handleSubmit, values, errors };
}

export default useForm;




