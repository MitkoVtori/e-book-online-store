import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faCircleNotch, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../contexts/AuthContext";
import styles from "./ResetPasswordForms.module.css";

const ChangePasswordForm = ({ onCloseReset }) => {
  const [formValues, setFormValues] = useState({
    old_password: "",
    password: "",
    password2: "",
  });
  const { 
    authError, 
    onChangePasswordSubmit,
    isSubmitting } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const {old_password, password, password2} = formValues;
    if (password === password2) {
      onChangePasswordSubmit(old_password, password, password2);
    }
  };

  const { register, trigger, watch, clearErrors, formState: { errors, isValid } } = useForm({ mode: "onBlur" });

  useEffect(() => {
    isValid ? clearErrors() : null;
  }, [isValid])

  return (
  <>
    <div className={styles['resetPasswordForm-container']}>
    <form className={styles["resetPasswordForm"]} onSubmit={handleSubmit}>
    <button type="button" className={styles["btn-close"]} disabled={isSubmitting} onClick={onCloseReset}>
    <FontAwesomeIcon className={styles["fa-icon"]} icon={faXmarkSquare} />
    </button>
      <ul className={styles["inputs-list"]} role="list">
        <li className={styles["input-item"]}>
        <input
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
          type="password"
          {...register("old_password", {
            required: "Паролата е задължителна",
            minLength: { value: 6, message: "Паролата трябва да бъде минимум 6 символа!" },
            onChange(e) {
              setFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
            },
          })}
          value={formValues.old_password}
          placeholder="Стара парола"
        />
        </li>
        {errors.old_password &&
          <li className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {errors.old_password.message?.toString()}</li>
        }
        <li className={styles["input-item"]}>
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
              if (watch("password2") !== "") {
                trigger("password2")
              }
            },
          })}
          value={formValues.password}
          placeholder="Нова парола"
        />
        </li>
        {errors.password &&
          <li className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {errors.password.message?.toString()}</li>
        }
        <li className={styles["input-item"]}>
        <input
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
          type="password"
          {...register("password2", {
            required: "Повторението на новата парола е задължително",
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
          value={formValues.password2}
          placeholder="Повтори новата парола"
        />
        </li>
        {errors.password2 &&
          <li className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {errors.password2.message?.toString()}</li>
        }
      </ul>
      <button type="submit" disabled={!isValid || isSubmitting} className={`${styles[`btn-reset`]} ${styles[isValid ? "isValid" : "isNotValid"]}`}>
        {!isSubmitting ? 'Запази' : <FontAwesomeIcon className={styles["fa-icon"]} icon={faCircleNotch} spin />}
      </button>
      {authError && <p className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {authError}</p>}
    </form>
    </div>
  </>
  );
};

export default ChangePasswordForm;
