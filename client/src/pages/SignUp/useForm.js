import { useState, useEffect } from "react";

const useForm = (validateInfo) => {
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

    const handleChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    
    const handleSubmit = e => {
        e.preventDefault();

        setErrors(validateInfo(values));
    };

    return {handleChange, handleSubmit, values, errors};
}

export default useForm;