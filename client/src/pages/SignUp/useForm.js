import { useState, useEffect } from "react";

const useForm = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        password2: '',
        fname: '',
        lname: '',
        day: '',
        month: '',
        year: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    return {handleChange, values};
}

export default useForm;