import React from 'react';
import { Link } from "react-router-dom";
import useForm from './useForm';
import validateInfo from './validateInfo';
import './SignupForm.css';

const SignupForm = () => {
    const { handleChange, handleSubmit, values, errors } = useForm(validateInfo);

    return (
        <div style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + '/plant-bg.png'})`,
            height: '100vh', width: '100vw', display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <form onSubmit={handleSubmit} className='form' noValidate>
                <h1 className='signUpHeader'>Sign up</h1>
                <div className='signup-inputs'>
                    <input
                        type='text'
                        name='username'
                        className='signup-input'
                        placeholder='Enter your username'
                        value={values.username}
                        onChange={handleChange}
                    />
                    <label htmlFor='username'
                        className='signup-label'>
                        Username
                    </label>

                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className='signup-inputs'>
                    <input
                        type='password'
                        name='password'
                        className='signup-input'
                        placeholder='Enter your password'
                        value={values.password}
                        onChange={handleChange}
                    />
                    <label htmlFor='password'
                        className='signup-label'>
                        Password
                    </label>
                    
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div className='signup-inputs'>
                    <input
                        type='password'
                        name='password2'
                        className='signup-input'
                        placeholder='Re-enter your password'
                        value={values.password2}
                        onChange={handleChange}

                    />
                    <label htmlFor='password2'
                        className='signup-label'>
                        Confirm Password
                    </label>

                    {errors.password2 && <p>{errors.password2}</p>}
                </div>
                <div className='signup-inputs'>
                    <input
                        type='fname'
                        name='fname'
                        className='signup-input'
                        placeholder='Enter your first name'
                        value={values.fname}
                        onChange={handleChange}

                    />
                    <label htmlFor='fname'
                        className='signup-label'>
                        First Name
                    </label>

                    {errors.fname && <p>{errors.fname}</p>}
                </div>
                <div className='signup-inputs'>
                    <input
                        type='lname'
                        name='lname'
                        className='signup-input'
                        placeholder='Enter your last name'
                        value={values.lname}
                        onChange={handleChange}
                    />
                    <label htmlFor='lname'
                        className='signup-label'>
                        Last Name
                    </label>

                    {errors.lname && <p>{errors.lname}</p>}
                </div>
                <div className='signup-inputs'>
                    <input
                        type='dob'
                        name='dob'
                        className='signup-input'
                        placeholder='DD/MM/YYYY'
                        value={values.dob}
                        onChange={handleChange}

                    />
                    <label htmlFor='dob'
                        className='signup-label'>
                        Date of Birth
                    </label>

                    {errors.dob && <p>{errors.dob}</p>}
                </div>
                <div className='signup-inputs'>
                    <input
                        type='email'
                        name='email'
                        className='signup-input'
                        placeholder='Enter your email'
                        value={values.email}
                        onChange={handleChange}
                    />
                    <label htmlFor='email'
                        className='signup-label'>
                        Email
                    </label>

                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div>
                    <button className='signup-input-btn'
                        type='submit'>
                        Sign Up
                    </button>
                </div>
                <div>
                    <span class="login">
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default SignupForm;
