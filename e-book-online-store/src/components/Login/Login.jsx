import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

import styles from './Login.module.css'


export default function Login () {

    const { onLoginSubmit } = useAuthContext();

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })


    const changeHandler = (e) => {
        setFormValues( state => ({...state, [e.target.name]: e.target.value}))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(formValues)
     
         onLoginSubmit(formValues)
    }


    return(
       
        <div className={styles['form-container']}>


            <form onSubmit={onSubmit} method="POST">

                <p className={styles['sign-on']}>Sign in</p>

                
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={formValues.email} onChange={changeHandler} placeholder="Your email address" />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formValues.password} onChange={changeHandler} placeholder="Your password" />

                <Link to="/">Forgot your password?</Link>

                <input type="submit" value="Sign in" />


                <Link to="/register"  className={styles['create-account']}>Create account</Link>

            </form>

        </div>
    )


}