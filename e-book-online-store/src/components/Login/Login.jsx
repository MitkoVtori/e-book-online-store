import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faCircleNotch, faCheckCircle, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../contexts/AuthContext";
import ResetPasswordRequestForm from "../ResetPasswordForms/ResetPasswordRequestForm";
import ResetPasswordForm from "../ResetPasswordForms/ResetPasswordForm";
import styles from "./Login.module.css";

export default function Login() {
  document.title = "Login";

  const { 
    onLoginSubmit, 
    authError, 
    clearAuthError,
    openPopupResetRequest, 
    setOpenPopupResetRequest,
    openPopupResetPassword, 
    setOpenPopupResetPassword,
    resetMessage,
    setResetMessage,
    searchParams,
    isSubmitting } = useAuthContext();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  

  useEffect(() => {
    setOpenPopupResetPassword(!!searchParams.get("popupResetPassword") || false);
  }, [openPopupResetPassword])

  const onSubmit = (e) => {
    e.preventDefault();
    onLoginSubmit(formValues);

  };

  const { register, clearErrors, formState: { errors, isValid } } = useForm({ mode: "onBlur" });

  useEffect(() => {
    isValid ? clearErrors() : null;
  }, [isValid])

//   Server validator
//   const [hasServerError, setHasServerError] = useState(false);
//   const [serverError, setServerError] = useState({});

  ///////////////////////////////////////////////////////// Validations

  // function validateEmail(email) {
  //   const emailRegex = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;
  //   return emailRegex.test(email);
  // }

  // const emailValidator = () => {
  //   if (!validateEmail(formValues.email)) {
  //     setErrors((state) => ({
  //       ...state,
  //       email: "Посоченият от вас мейл адрес не е във валиден формат",
  //     }));
  //   }
  //   else {
  //       if (errors.email) {
  //         setErrors((state) => ({ ...state, email: "" }));
  //       }
  //     }
  // };


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
    <>
    <div className={styles["form-container"]}>
      <form
        onSubmit={onSubmit}
        id="request"
        className={styles["formlog"]}
      >
        <p className={styles["sign-on"]}>Влизане в акаунт</p>

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
        {/* {errors.email && <p className={styles.errorMessage}>{errors.email}</p>} */}
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
            },
          })}
          value={formValues.password}
          placeholder="Вашата парола"
        />
        {/* {errors.password && (
          <p className={styles.errorMessage}>{errors.password}</p>
        )} */}
        {errors.password &&
          <p className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {errors.password.message?.toString()}</p>
        }
        <span className={styles["forgot-password"]} onClick={() => { setOpenPopupResetRequest(true), clearAuthError() }}>Забравена парола?</span>

        <button type="submit" disabled={!isValid || isSubmitting} className={`${styles[`btn-login`]} ${styles[isValid ? "isValid" : "isNotValid"]}`}>
          {!isSubmitting ? "Влизане" : <FontAwesomeIcon className={styles["fa-icon"]} icon={faCircleNotch} spin />}
          </button> 
        {authError && <p className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {authError}</p>}
        {/* <Link to="/register" className={styles["create-account"]} onClick={clearAuthError}>
          Създай акаунт
        </Link> */}

        <span onClick={clearAuthError}>
          Все още нямаш акаунт? <Link to="/register" >Регистрирай се!</Link>
        </span>
      </form>
    </div>
    {openPopupResetRequest && (
      <ResetPasswordRequestForm
        onCloseReset={() => { setOpenPopupResetRequest(false), clearAuthError() }}
      />
    )}
    {openPopupResetPassword && (
      <ResetPasswordForm
        onCloseReset={() => { setOpenPopupResetPassword(false), searchParams.delete("popupResetPassword"), clearAuthError() }}
      />
    )}
    {(!authError && !!resetMessage && !isSubmitting) && <p className={styles["ok-message"]} >
        <span className={styles["ok-delete"]} onClick={() => setResetMessage("")}><FontAwesomeIcon className={styles["fa-icon"]} icon={faXmarkSquare} /></span>
        <span className={styles['content']}><FontAwesomeIcon className={styles["fa-icon"]} icon={faCheckCircle} /><span>{resetMessage}</span></span>
        <span className={styles["timer"]}></span>
      </p>}
    </>
  );
}
