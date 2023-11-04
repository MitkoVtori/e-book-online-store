import { Link } from "react-router-dom";
import { useState } from "react";

import styles from './Login.module.css'


export default function Login () {

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })


    const changeHandler = (e) => {
        setFormValues( state => ({...state, [e.target.name]: e.target.value}))
    }


    return(
       
        <div className={styles['form-container']}>


            <div className={styles['logo']}>
                <h2>Logo here</h2>
            </div>

            <form method="POST">

                <p className={styles['sign-on']}>Sign on</p>

                
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={formValues.email} onChange={changeHandler} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formValues.password} onChange={changeHandler} />

                <Link to="/">Forgot your password?</Link>

                <input type="submit" value="Sign on" />


                <Link to="/">Create account</Link>

            </form>

        </div>
    )


}