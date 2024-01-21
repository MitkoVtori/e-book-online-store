import styles from "../UpdateProfile/UpdateProfile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState} from "react";


import { useAuthContext } from "../../contexts/AuthContext";

import * as userService from '../../services/userService'



const updateFormInitialState = {
  address1: "",
  address2: "",
  city: "",
  country: "",
  state: "",
  zipCode: "",
  phone: "",
  bookseller_description: "",
  
};

export default function UpdateProfile() {
  document.title = 'Актуализация на профила';

  const navigate = useNavigate();

  const {isAuth } = useAuthContext();

  
  const [formUpdateValues, setFormUpdateValues] = useState(updateFormInitialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormUpdateValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const formUpdateSubmitHandler = (e) => {
    e.preventDefault();
    handleUpdateConfirmation();
  };
  const resetUpdateFormHandler = () => {
    setFormUpdateValues(updateFormInitialState);
    setErrors({})
  };

// UPDATE

const handleUpdateConfirmation = () => {
    userService
    .update(formUpdateValues)
    .then(() => {
        navigate("/");
      })

      .catch((err) => {
        console.log();
        console.log(err.message);
      });

      resetUpdateFormHandler();
  };

  return (
    <>
      <section className={styles["Form"]}>
        <div className={styles["wrapper"]}>
          <form id="request" method='POST' onSubmit={formUpdateSubmitHandler}>
           
            <h2  className={styles["title"]}>Промяна на потребителските права</h2>

            <div className={styles["Content"]}>
              <div className={styles["inputBox"]}>
                <label htmlFor="address1">Адрес 1</label>
                <input
                  type="text"
                  placeholder="адрес"
                  name="address1"
                  id="address1"
                  value={formUpdateValues.address1}
                  onChange={handleChange}
                 required
                  className={errors.address1 && styles.errorInput}
                />
                
              </div>

              <div className={styles["inputBox"]}>
                <label htmlFor="address2">Адресс 2</label>
                <input
                  type="text"
                  placeholder="адрес"
                  name="address2"
                  id="address2"
                  value={formUpdateValues.address2}
                  onChange={handleChange}
                 
                  required
                  className={errors.address2 && styles.errorInput}
                />
                
              </div>

              <div className={styles["inputBox"]}>
                <label htmlFor="city">Град</label>
                <input
                  type="text"
                  placeholder="град"
                  name="city"
                  value={formUpdateValues.city}
                  onChange={handleChange}
                    id="city"
                  required
                  className={errors.city && styles.errorInput}
                />
               
              </div>

              <div className={styles["inputBox"]}>
                <label htmlFor="country">Страна</label>
                <input
                  type="text"
                  placeholder="страна"
                  name="country"
                  value={formUpdateValues.country}
                  onChange={handleChange}
                   id="country"
                  required
                  className={errors.country && styles.errorInput}
                />
                
              </div>

              <div className={styles["inputBox"]}>
                <label htmlFor="state">Област</label>
                <input
                  type="text"
                  placeholder="област"
                  name="state"
                  value={formUpdateValues.state}
                  onChange={handleChange}
                   id="state"
                  required
                  className={errors.state && styles.errorInput}
                />
                
              </div> 

              <div className={styles["inputBox"]}>
                <label htmlFor="zipCode">пощенски код</label>
                <input
                  type="number"
                  placeholder="пощенски код"
                  name="number"
                  value={formUpdateValues.number}
                  onChange={handleChange}
                   id="number"
                  required
                  className={errors.number && styles.errorInput}
                />
        </div>


        <div className={styles["inputBox"]}>
                <label htmlFor="phone">телефон</label>
                <input
                  type="number"
                  placeholder="телефон"
                  name="phone"
                  value={formUpdateValues.phone}
                  onChange={handleChange}
                   id="phone"
                  required
                  className={errors.phone && styles.errorInput}
                />
        </div>

        <div className={styles["inputBox"]}>
                <label htmlFor="bookseller_description">Описание на продавача</label>
                <input
                  type="text"
                  placeholder="описание за продавача"
                  name="bookseller_description"
                  value={formUpdateValues.bookseller_description}
                  onChange={handleChange}
                   id="bookseller_description"
                  required
                  className={errors.bookseller_description && styles.errorInput}
                />
                
              </div>


              <div className={styles["regBtn-container"]}>
                
                <button type="submit"
                    disabled={(Object.values(errors).some(x => x)
                      || (Object.values(formUpdateValues).some(x => x == '')))}>
                  Обнови
                </button>

              
              
 

              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}