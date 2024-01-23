import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faCircleNotch, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../contexts/AuthContext";
import styles from "./ResetPasswordForms.module.css";

const ResetPasswordRequestForm = ({ onCloseReset }) => {
  const [userEmail, setUserEmail] = useState('');
  const { 
    authError, 
    onResetPasswordRequestSubmit,
    isSubmitting } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    onResetPasswordRequestSubmit(userEmail);
  };

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const { register, clearErrors, formState: { errors, isValid } } = useForm({ mode: "onBlur" });

  useEffect(() => {
    isValid ? clearErrors() : null;
  }, [isValid])


  return (
    <>
      <div className={styles['resetRequestForm-container']}>
      <form className={styles["resetRequestForm"]} onSubmit={handleSubmit}>
      <button type="button" className={styles["btn-close"]} onClick={onCloseReset}>
      <FontAwesomeIcon className={styles["fa-icon"]} icon={faXmarkSquare} />
      </button>
        <ul className={styles["inputs-list"]} role="list">
          <li className={styles["input-item"]}>
            <input
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              value={userEmail}
              placeholder="Вашият имейл адрес"
              spellCheck="false"
              type="email"
              {...register("email", {
                required: "Имейл адресът е задължителен.",
                pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Посоченият от вас имейл адрес не е във валиден формат" },
                onChange(e) {
                  handleEmailChange(e)
                },
              })}
            />
          </li>
          {errors.email && 
          <li className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> 
          {errors.email.message?.toString()}
          </li>}
        </ul>

        <button type="submit" disabled={!isValid || isSubmitting} className={`${styles[`btn-reset`]} ${styles[isValid ? "isValid" : "isNotValid"]}`}>
          {!isSubmitting ? 'Нулирай парола' : <FontAwesomeIcon className={styles["fa-icon"]} icon={faCircleNotch} spin />}
        </button>
        {authError && <p className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {authError}</p>}
      </form>
      </div>
    </>
  );
};

export default ResetPasswordRequestForm;
