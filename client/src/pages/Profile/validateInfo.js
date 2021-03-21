export default function validateInfo(values) {
    let errors = {};
  
    if (!values.username.trim()) {
      errors.username = "Username required";
    }

    if (!values.fname) {
        errors.fname = "First name is required";
    } 
    else if (!/^[a-zA-Z ]{2,20}$/.test(values.fname.trim())) {
        errors.fname = "Enter a valid name";
    }

    if (!values.lname) {
        errors.lname = "Last name is required";
    } 
    else if (!/^[a-zA-Z ]{2,20}$/.test(values.lname.trim())) {
        errors.lname = "Enter a valid name";
    }

    // if (!values.dob) {
    //     errors.dob = "Date of birth is required";
    // } 
    // else if (!/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-](19|20)\d\d$/.test(values.dob)) {
    //     errors.dob = "Enter a valid date of birth";
    // }
    
    if (!values.email) {
      errors.email = "Email required";
    } 
    else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    return errors;
}