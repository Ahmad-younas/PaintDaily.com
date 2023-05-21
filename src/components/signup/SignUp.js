import React, { useEffect, useState } from 'react';
import '../login/Login.js';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import Style from './SignUp.module.css';
import Navbar from '../navbar/Navbar.js';
import axios from 'axios';
import {v4 as uuid } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignUp() {

    const navigate = useNavigate();
    const [Seller, SetSeller] = useState({
        username: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmpassword: '',
        address: '',
        checkSellerId:1
    });
    const [formError, SetFormError] = useState({
        email:'',
        password:'',
        username:'',
        fullName:'',
        phoneNumber:'',
        confirmpassword:'',
        address:''
    });
    const [isSubmit, setIsSubmit] = useState(false);
    useEffect(()=>{
        console.log(formError);
        if(Object.keys(formError).length === 0 && isSubmit){
            console.log(formError);
        }

    })
    const handleSubmit = (e) =>{
        e.preventDefault();
        SetFormError(validate(Seller))
        setIsSubmit(true);
        if(Object.keys(formError).length === 0 && isSubmit){
            handlePostSubmit();
        }

    }

    

    const validate = (value) =>{
        const errors={}
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const phonenum = /^(\+92)[0-9]{10}$/gm;
        if(!value.password){
            errors.password="Password is required"
        }
        else if(value.password.length < 8)
        {
            errors.password="Password should be 8 characters long"
        }
        else if(value.password.length >= 16)
        {
            errors.password="Password should be less than 16 characters"
        }
        if(!value.email){
            errors.email="Email is required"
        }
        else if(!value.email.match(regex))
        {
            errors.email="Invalid email"
        }
        

        if(!value.username){
            errors.username="username is required"
        }
        else if(value.username.length <= 2)
        {
            errors.username="username should be 3 characters minimum"
        }
        if(!value.fullName){
            errors.fullName="Full Name is required"
        }
        if(!value.phoneNumber){
            errors.phoneNumber="Phone Number is required"
        }
        else if(!value.phoneNumber.match(phonenum))
        {
            errors.phoneNumber="Invalid Phone Number"
        }
        if(!value.confirmpassword){
            errors.confirmpassword="Please confirm the password"
        }
        if(!value.address){
            errors.address="Address is required"
        }
        if(value.password !== value.confirmpassword){
            errors.confirmpassword="Password not matched";
        }
        return errors;

    }



    function validateUsername(value) {
        let error;
        if (value === 'admin' || isNaN(value) === false) {
            error = 'Invalid username';
        }
        else if (value.length < 5){
            error = 'username should not be less than 5 characters'
        }
        return error;
    }

    function validateEmail(value) {
        let error;
        if (!value) {
          error = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          error = 'Invalid email address';
        }
        return error;
      }


      function validateForm() {
        // Retrieving the values of form elements 
        var name = document.contactForm.name.value;
        var email = document.contactForm.email.value;
        var mobile = document.contactForm.mobile.value;
      }


    const handlePostSubmit = () => {
        axios({
            method: 'post',
            url: 'http://localhost:9090/api/signup',
            data: {
                ...Seller,
                sellerId: uuid()
            }
        }).then((res) => {
            console.log(res);
            if (res.data === 'User already Exists'){
                toast.error('👤 User Already Exist!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                navigate("/signUp");
            }else{
                navigate("/login");
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleChange = (event) => {

        SetSeller({
            ...Seller,
            [event.target.name]: event.target.value

        });
    }


    // const phoneRegExp =/^(\+92|0|92)[0-9]{10}$/;

    // const SignupSchema = Yup.object().shape({
    //     email: Yup.string().email('Invalid email').required('Required'),
    //     phoneNumber: Yup.string()
    //         .required("required")
    //         .matches(phoneRegExp, 'Phone number is not valid'),
    //         // .min(11, "too short")
    //         // .max(11, "too long"),
    //     password: Yup.string()
    //     .required('No password provided.') 
    //     .min(8, 'Password is too short - should be atleast 8 chars minimum.'),
    //     username: Yup.string()
    //         .required("required"),
    //         fullName: Yup.string()
    //         .required("required"),
    //     // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    // });
    return (
        <React.Fragment>
            <Navbar />
            <main className={Style.main}>
                <div className={Style.container}>
                    <div className={Style.form}>
                        <h2>Create Account</h2>
                                <form onSubmit={(event)=>{handleSubmit(event)}}>
                                    <label className={Style.form_lbl} htmlFor="username">Username: </label>
                                    <input className={Style.form_input} name="username"
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="username" />
                                    <p style={{color: 'red', marginLeft: '220px', marginTop: '10px', marginBottom: '-10px'}}>{formError.username}</p>
                                    {/* {errors.username && touched.username && <div className={Style.err_msgs}>{errors.username}</div>} */}

                                    <br />

                                    <label className={Style.form_lbl} htmlFor="fullName">Full Name: </label>
                                    <input className={Style.form_input} name="fullName" 
                                    onChange={handleChange}
                                    placeholder="Full Name" />
                                    <p style={{color: 'red', marginLeft: '220px', marginTop: '10px', marginBottom: '-10px'}}>{formError.fullName}</p>
                                    {/* {errors.fullName && touched.fullName && <div className={Style.err_msgs}>{errors.fullName }</div>} */}

                                    <br />

                                    <label className={Style.form_lbl} htmlFor="email">Email Address: </label>
                                    <input className={Style.form_input} name="email"
                                    onChange={handleChange}
                                    placeholder="Email" />
                                    <p style={{color: 'red', marginLeft: '220px', marginTop: '10px', marginBottom: '-10px'}}>{formError.email}</p>
                                    {/* {errors.email && touched.email ? (
                                        <div className={Style.err_msgs}>{errors.email}</div>
                                    ) : null} */}

                                    <br />

                                    <label className={Style.form_lbl} htmlFor="phoneNumber">Phone Number: </label>
                                    <input className={Style.form_input} name="phoneNumber"  
                                    onChange={handleChange}
                                    placeholder="+925550123678"/>
                                    
                                    <p style={{color: 'red', marginLeft: '220px', marginTop: '10px', marginBottom: '-10px'}}>{formError.phoneNumber}</p>
                                    {/* {errors.phoneNumber && touched.phoneNumber ? (
                                        <div className={Style.err_msgs}>{errors.phoneNumber}</div>
                                    ) : null} */}

                                    <br />

                                    <label className={Style.form_lbl} htmlFor="password">Address: </label>
                                    <input className={Style.form_input} name="address" type="address" 
                                    onChange={handleChange}
                                    placeholder="Address" />
                                    <p style={{color: 'red', marginLeft: '220px', marginTop: '10px', marginBottom: '-10px'}}>{formError.address}</p>
                                    {/* {errors.password && touched.password ? (
                                        <div className={Style.err_msgs}>{errors.password}</div>
                                    ) : null} */}

                                    <br/>

                                    <label className={Style.form_lbl} htmlFor="password">Password: </label>
                                    <input className={Style.form_input} name="password" type="password" 
                                    onChange={handleChange}
                                    placeholder="Password" />
                                    <p style={{color: 'red', marginLeft: '220px', marginTop: '10px', marginBottom: '-10px'}}>{formError.password}</p>
                                    {/* {errors.password && touched.password ? (
                                        <div className={Style.err_msgs}>{errors.password}</div>
                                    ) : null} */}

                                    <br />

                                    <label className={Style.form_lbl} htmlFor="confirmpassword">Confirm Password: </label>
                                    <input className={Style.form_input} name="confirmpassword" type="password" 
                                    onChange={handleChange}
                                    placeholder="Confirm Password" />
                                    <p style={{color: 'red', marginLeft: '220px', marginTop: '10px'}}>{formError.confirmpassword}</p>
                                    {/* {errors.confirmpassword && touched.confirmpassword ? (
                                        <div className={Style.err_msgs}>{errors.confirmpassword}</div>
                                    ) : null} */}
                                    <br />
                                    <button className={Style.submit_btn} type="submit">Submit</button>
                                    <div className={Style.create_acc}>
                                    <p>Already have an account?</p><Link style={{color: '#0066f2', fontSize: '17px', marginLeft: '5px'}} to='/login'>Login</Link>
                                    </div>
                                </form>
                    </div>
                </div>
                <ToastContainer/>
            </main>
        </React.Fragment>
    )
}

export default SignUp;