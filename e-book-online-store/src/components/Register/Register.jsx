


import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

import styles from './Register.module.css';


export default function Register () {

    const { onRegisterSubmit } = useAuthContext();

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        repassword: '',
    })


    const changeHandler = (e) => {
        setFormValues( state => ({...state, [e.target.name]: e.target.value}))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(formValues)
     
         onRegisterSubmit(formValues)
    }


    return(
       
        <div className={styles['form-container']}>


            <form onSubmit={onSubmit} method="POST">

                <p className={styles['sign-up']}>Create account</p>

                <label htmlFor="name">Your name</label>
                <input type="text" name="username" value={formValues.username} onChange={changeHandler} placeholder="First and last name" />
                
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={formValues.email} onChange={changeHandler} placeholder="Valid email address" />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formValues.password} onChange={changeHandler} placeholder="At least 6 characters"/>

                <label htmlFor="repassword">Confirm Password</label>
                <input type="password" name="repassword" value={formValues.repassword} onChange={changeHandler} placeholder="Repeat your password" />

                <input type="submit" value="Sign on" />


                <span>Aready have an account?  <Link to="/login">Sign in </Link></span>

            </form>

        </div>
    )


}