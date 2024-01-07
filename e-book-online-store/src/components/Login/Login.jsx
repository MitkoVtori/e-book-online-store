import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

import styles from "./Login.module.css";

export default function Login() {
  document.title = "Login";


  const { onLoginSubmit } = useAuthContext();

  const [errors, setErrors] = useState({});

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onLoginSubmit(formValues);
  };


//   Server validator
//   const [hasServerError, setHasServerError] = useState(false);
//   const [serverError, setServerError] = useState({});

  ///////////////////////////////////////////////////////// Validations

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    return emailRegex.test(email);
  }

  const emailValidator = () => {
    if (!validateEmail(formValues.email)) {
      setErrors((state) => ({
        ...state,
        email: "Посоченият от вас мейл адрес не е във валиден формат",
      }));
    }
    else {
        if (errors.email) {
          setErrors((state) => ({ ...state, email: "" }));
        }
      }
  };


  // АКО искаме да има валидацяи за паролата
  
  // const passwordValidator = () => {
  //   if (formValues.password.length < 6) {
  //     setErrors((state) => ({
  //       ...state,
  //       password: "Паролата трябва да бъде минимум 6 символа!",
  //     }));
  //   } else {
  //     if (errors.password) {
  //       setErrors((state) => ({ ...state, password: "" }));
  //     }
  //   }
  // };

  return (
    <div className={styles["form-container"]}>
      <form
        onSubmit={onSubmit}
        method="POST"
        id="request"
        className={styles["formlog"]}
      >
        <p className={styles["sign-on"]}>Sign in</p>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={changeHandler}
          placeholder="Your email address"
          required
          onBlur={emailValidator}
        />
        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={changeHandler}
          placeholder="Your password"
          // onBlur={passwordValidator}
        />
        {/* {errors.password && (
          <p className={styles.errorMessage}>{errors.password}</p>
        )} */}
        <Link to="/">Forgot your password?</Link>

        <input type="submit" value="Sign in" />

        <Link to="/register" className={styles["create-account"]}>
          Create account
        </Link>
      </form>
    </div>
  );
}
