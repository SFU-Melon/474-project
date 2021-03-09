import React from 'react';
import { Link } from "react-router-dom";
import useForm from './useForm';
import validateInfo from './validateInfo';

const SignupForm = () => {
    const { handleChange, handleSubmit, values, errors } = useForm(validateInfo);

    return (
        <div>
            <form onSubmit={handleSubmit} className='form' noValidate>
                <h1>Sign up</h1>
                <div className='signup-inputs'>
                    <label htmlFor='username'
                        className='signup-label'>
                        Username
                </label>
                    <input
                        type='text'
                        name='username'
                        className='signup-input'
                        placeholder='Enter your username'
                        value={values.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className='signup-inputs'>
                    <label htmlFor='password'
                        className='signup-label'>
                        Password
                </label>
                    <input
                        type='password'
                        name='password'
                        className='signup-input'
                        placeholder='Enter your password'
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div className='signup-inputs'>
                    <label htmlFor='password2'
                        className='signup-label'>
                        Confirm Password
                </label>
                    <input
                        type='password'
                        name='password2'
                        className='signup-input'
                        placeholder='Re-enter your password'
                        value={values.password2}
                        onChange={handleChange}
                    />
                    {errors.password2 && <p>{errors.password2}</p>}
                </div>
                <div className='signup-inputs'>
                    <label htmlFor='fname'
                        className='signup-label'>
                        First Name
                </label>
                    <input
                        type='fname'
                        name='fname'
                        className='signup-input'
                        placeholder='Enter your first name'
                        value={values.fname}
                        onChange={handleChange}
                    />
                    {errors.fname && <p>{errors.fname}</p>}
                </div>
                <div className='signup-inputs'>
                    <label htmlFor='lname'
                        className='signup-label'>
                        Last Name
                </label>
                    <input
                        type='lname'
                        name='lname'
                        className='signup-input'
                        placeholder='Enter your last name'
                        value={values.lname}
                        onChange={handleChange}
                    />
                    {errors.lname && <p>{errors.lname}</p>}
                </div>
                <div className='signup-inputs'>
                    <label htmlFor='dob'
                        className='signup-label'>
                        Date of Birth
                </label>
                    <input
                        type='dob'
                        name='dob'
                        className='signup-input'
                        placeholder='DD/MM/YYYY'
                        value={values.dob}
                        onChange={handleChange}
                    />
                    {errors.dob && <p>{errors.dob}</p>}
                </div>
                <div className='signup-inputs'>
                    <label htmlFor='email'
                        className='signup-label'>
                        Email
                </label>
                    <input
                        type='email'
                        name='email'
                        className='signup-input'
                        placeholder='Enter your email'
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div>
                    <button className='signup-input-btn'
                        type='submit'>
                        Sign Up
                    </button>
                </div>
                <div>
                    <span>
                        Already have an account? Login <Link to="/login">here</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default SignupForm;
