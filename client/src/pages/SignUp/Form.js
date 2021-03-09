import React from 'react';
import { Link } from "react-router-dom";
import useForm from './useForm';

const Form = () => {
    const {handleChange, values} = useForm();

    return (
        <div>
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
            </div>
            <div className='signup-inputs'>
                <label htmlFor='dob'
                className='signup-label'>
                    Date of Birth
                </label>
                <input
                    type='dob'
                    name='day'
                    className='signup-input'
                    placeholder='Day-22'
                    value={values.day}
                    onChange={handleChange}
                />
                <input
                    type='dob'
                    name='month'
                    className='signup-input'
                    placeholder='Month-12'
                    value={values.month}
                    onChange={handleChange}
                />
                <input
                    type='dob'
                    name='year'
                    className='signup-input'
                    placeholder='Year-1992'
                    value={values.year}
                    onChange={handleChange}
                />
            </div>


            <div className='signup-inputs'>
                <label htmlFor='email'
                className='signup-label'>
                    Email
                </label>
                <input
                    id='email'
                    type='email'
                    name='email'
                    className='signup-input'
                    placeholder='Enter your email'
                />
            </div>



            <button className='signup-input-btn'
                type='submit'>
                    Sign Up
            </button>

            <span>
                Already have an account? Login <Link to="/login">here</Link>
            </span>

        </div>
    )
}

export default Form;
