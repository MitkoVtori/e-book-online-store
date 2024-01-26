import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faCircleNotch, faCheckCircle, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

import styles from "./Register.module.css";

export default function Register() {
  document.title = "Register Page";

  const { 
    onRegisterSubmit,
    authError, 
    clearAuthError,
    isSubmitting
   } = useAuthContext();

  const [formValues, setFormValues] = useState({
    first_last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

 
  const onSubmit = (e) => {
    e.preventDefault();
    if (formValues.password === formValues.confirmPassword) {
      onRegisterSubmit(formValues);
    }
  };

  const { register, trigger, watch, clearErrors, formState: { errors, isValid } } = useForm({ mode: "onBlur" });

  useEffect(() => {
    isValid ? clearErrors() : null;
  }, [isValid])

  // // Validations

  // /////////////////////////////////////////////////////// FIRST AND LAST NAME VALIDATOR  //////////////////////////////////////////////////////

  // const first_Last_NameValidator = () => {
  //   if (formValues.first_last_name.length < 2) {
  //     setErrors((state) => ({
  //       ...state,
  //       username: "Това поле трябва да е повече от 2 символа!",
  //     }));
  //   } else {
  //     if (errors.first_last_name) {
  //       setErrors((state) => ({
  //         ...state,
  //         username: "",
  //       }));
  //     }
  //   }
  // };

  // // /////////////////////////////////// EMAIl Validator //////////////////////////

  // function emailIsValid(email) {
  //   const regexEmail = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;
  //   return regexEmail.test(email);
  // }

  // const emailValidator = () => {
  //   if (!emailIsValid(formValues.email)) {
  //     setErrors((state) => ({
  //       ...state,
  //       email: "Посоченият от вас мейл адрес не е във валиден формат",
  //     }));
  //   } else {
  //     if (errors.email) {
  //       setErrors((state) => ({
  //         ...state,
  //         email: "",
  //       }));
  //     }
  //   }
  // };

  // ////////////////////////// PASSWORD VALIDATOR //////////////////////////////////////////////////////

  // const passwordValidator = () => {
  //   if (formValues.password.length < 6) {
  //     setErrors((state) => ({
  //       ...state,
  //       password: "Вашата парола трябва да бъде минимум 6 символа!",
  //     }));
  //   } else {
  //     if (errors.password) {
  //       setErrors((state) => ({
  //         ...state,
  //         password: "",
  //       }));
  //     }
  //   }
  // };

  // /////////////////////////////////// REPASS VALIDATOR //////////////////////////////////////////////////////

  // const repassValidator = () => {
  //   if (formValues.password != formValues.repassword) {
  //     setErrors((state) => ({
  //       ...state,
  //       repassword: "Посочената парола не съвпада!",
  //     }));
  //   } else {
  //     if (errors.repassword) {
  //       setErrors((state) => ({
  //         ...state,
  //         repassword: "",
  //       }));
  //     }
  //   }
  // };

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={onSubmit} >
        <p className={styles["sign-up"]}>Създаване на акаунт</p>

        <label htmlFor="first_last_name">Имена</label>
        <input
          type="text"
          {...register("first_last_name", {
            required: "Посочването на име и фамилия е задължително.",
            minLength: { value: 2, message: "Посочените име и фамилия трябва да бъдат минимум 2 символа!" },
            onChange(e) {
              setFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
            },
          })}
          value={formValues.first_last_name}
          placeholder="Име и фамилия"
        />
        {errors.first_last_name &&
          <p className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {errors.first_last_name.message?.toString()}</p>
        }

        <label htmlFor="email">Електронна поща</label>
        <input
          type="email"
          {...register("email", {
            required: "Имейл адресът е задължителен.",
            pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Посоченият от вас имейл адрес не е във валиден формат" },
            onChange(e) {
              setFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
            },
          })}
          value={formValues.email}
          placeholder="Вашият имейл адрес"
        />
        {errors.email &&
          <p className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {errors.email.message?.toString()}</p>
        }

        <label htmlFor="password">Парола</label>
        <input
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          type="password"
          {...register("password", {
            required: "Паролата е задължителна",
            minLength: { value: 6, message: "Паролата трябва да бъде минимум 6 символа!" },
            onChange(e) {
              setFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
              if (watch("confirmPassword") !== "") {
                trigger("confirmPassword")
              }
            },
          })}
          value={formValues.password}
          placeholder="Вашата парола"
        />
        {errors.password &&
          <p className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {errors.password.message?.toString()}</p>
        }

        <label htmlFor="confirmPassword">Повторение на паролата</label>
        <input
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          type="password"
          {...register("confirmPassword", {
            required: "Повторението на паролата е задължително",
            validate: {
              assertPasswords: (value) => {
                if (value !== "" && value !== watch("password"))
                  return "Паролата не съвпада."
              }
            },
            onChange(e) {
              setFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
            },
          })}
          value={formValues.confirmPassword}
          placeholder="Повтори паролата"
        />
        {errors.confirmPassword &&
          <p className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {errors.confirmPassword.message?.toString()}</p>
        }

        <button type="submit" disabled={!isValid || isSubmitting} className={`${styles[`btn-register`]} ${styles[isValid ? "isValid" : "isNotValid"]}`}>
          {!isSubmitting ? "Регистрация" : <FontAwesomeIcon className={styles["fa-icon"]} icon={faCircleNotch} spin />}
          </button> 
        {authError && <p className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {authError}</p>}

        <span onClick={clearAuthError}>
          Вече имаш акаунт? <Link to="/login" >Влез</Link>
        </span>
      </form>
    </div>
  );
}
