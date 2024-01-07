import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

import styles from "./Register.module.css";

export default function Register() {
  document.title = "Register Page";

  const { onRegisterSubmit } = useAuthContext();

  const [formValues, setFormValues] = useState({
    first_last_name: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onRegisterSubmit(formValues);
  };

  // Validations

  /////////////////////////////////////////////////////// FIRST AND LAST NAME VALIDATOR  //////////////////////////////////////////////////////

  const first_Last_NameValidator = () => {
    if (formValues.first_last_name.length < 2) {
      setErrors((state) => ({
        ...state,
        username: "Това поле трябва да е повече от 2 символа!",
      }));
    } else {
      if (errors.first_last_name) {
        setErrors((state) => ({
          ...state,
          username: "",
        }));
      }
    }
  };

  // /////////////////////////////////// EMAIl Validator //////////////////////////

  function emailIsValid(email) {
    const regexEmail = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    return regexEmail.test(email);
  }

  const emailValidator = () => {
    if (!emailIsValid(formValues.email)) {
      setErrors((state) => ({
        ...state,
        email: "Посоченият от вас мейл адрес не е във валиден формат",
      }));
    } else {
      if (errors.email) {
        setErrors((state) => ({
          ...state,
          email: "",
        }));
      }
    }
  };

  ////////////////////////// PASSWORD VALIDATOR //////////////////////////////////////////////////////

  const passwordValidator = () => {
    if (formValues.password.length < 6) {
      setErrors((state) => ({
        ...state,
        password: "Вашата парола трябва да бъде минимум 6 символа!",
      }));
    } else {
      if (errors.password) {
        setErrors((state) => ({
          ...state,
          password: "",
        }));
      }
    }
  };

  /////////////////////////////////// REPASS VALIDATOR //////////////////////////////////////////////////////

  const repassValidator = () => {
    if (formValues.password != formValues.repassword) {
      setErrors((state) => ({
        ...state,
        repassword: "Посочената парола не съвпада!",
      }));
    } else {
      if (errors.repassword) {
        setErrors((state) => ({
          ...state,
          repassword: "",
        }));
      }
    }
  };

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={onSubmit} method="POST">
        <p className={styles["sign-up"]}>Create account</p>

        <label htmlFor="first_last_name">Your name</label>
        <input
          type="text"
          name="first_last_name"
          value={formValues.username}
          onChange={changeHandler}
          placeholder="First and last name"
          onBlur={first_Last_NameValidator}
          required
        />
        {errors.username && (
          <p className={styles.errorMessage}>{errors.username}</p>
        )}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={changeHandler}
          placeholder="Valid email address"
          onBlur={emailValidator}
          id="email"
        />

        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={changeHandler}
          placeholder="At least 6 characters"
          onBlur={passwordValidator}
          id="password"
          required
        />

        {errors.password && (
          <p className={styles.errorMessage}>{errors.password}</p>
        )}

        <label htmlFor="repassword">Confirm Password</label>
        <input
          type="password"
          name="repassword"
          value={formValues.repassword}
          onChange={changeHandler}
          placeholder="Repeat your password"
          onBlur={repassValidator}
          id="repassword"
          required
        />

        {errors.repassword && (
          <p className={styles.errorMessage}>{errors.repassword}</p>
        )}

        <input type="submit" value="Sign on" />

        <span>
          Aready have an account? <Link to="/login">Sign in </Link>
        </span>
      </form>
    </div>
  );
}
