import { useEffect, useState } from "react"
import { useAuthContext } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faCircleNotch, faXmarkSquare, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import ChangePasswordForm from "../ResetPasswordForms/ChangePasswordForm";

import styles from "./Profile.module.css";

export default function Profile() {
    document.title = "Profile"
    const {
        onGetUserProfile,
        onEditUserProfile,
        onDeleteUserProfile,
        authError,
        clearAuthError,
        openPopupChangePassword, 
        setOpenPopupChangePassword,
        resetMessage,
        setResetMessage,
        isSubmitting
    } = useAuthContext();

    const [profileValues, setProfileValues] = useState({
        email: "",
        first_last_name: "",
        delivery_address: "",
        phone_number: "",
        profile_picture: "",
        owned_books: null
    });

    const [blobUrl, setBlobUrl] = useState(null);
    const [image, setImage] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteView, setDeleteView] = useState(false);

    useEffect(() => {
        if (!editMode) {
            onGetUserProfile()
                .then(profile => setProfileValues({
                    email: profile?.email || "",
                    first_last_name: profile?.first_last_name || "",
                    delivery_address: profile?.delivery_address || "",
                    phone_number: profile?.phone_number || "",
                    profile_picture: profile?.profile_picture || "",
                })).finally(setIsLoading(false))
        }
        clearAuthError();
        setResetMessage("");
    }, [editMode])

    const detectImage = (e) => {
        const file = e.target.files[0]
        if (file.size > 5242880) {
            //TODO ERROR MESSAGE
            return
        }
        setImage(file);
        if (blobUrl) {
            URL.revokeObjectURL(blobUrl);
        }
        setBlobUrl(URL.createObjectURL(file));
    }

    const deleteImage = () => {
        setImage("");
        setBlobUrl(null);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (image) setIsLoading(true);
        await onEditUserProfile(
                { ...profileValues, profile_picture: image ? image : profileValues.profile_picture }
            )
        setIsLoading(false);
        toggleEditMode();
    };

    const { register, reset, clearErrors, formState: { errors, isValid } } = useForm({ mode: "onBlur" });

    useEffect(() => {
        isValid ? clearErrors() : null;
    }, [isValid])

    const onDelete = (e) => {
        e.preventDefault();
        onDeleteUserProfile();
    }

    const toggleEditMode = () => {
        if(!isSubmitting) {
            deleteImage();
            reset();
            if(deleteView){setDeleteView(!deleteView)}
            setEditMode(!editMode);
        }
    }

    const toggleDeleteView = () => {
        if(!isSubmitting){
            clearAuthError();
            setDeleteView(!deleteView);
        }           
    }

    return (
        <>
            {editMode && <div className={styles["form-container"]}>
                <form onSubmit={onSubmit}>
                    <p className={styles["sign-up"]}>Редактиране на профил</p>

                    <div className={styles["profile-picture"]}>
                        <label htmlFor="photo">
                            {isLoading
                                ? <div className={styles["picture-spinner"]}>
                                    <FontAwesomeIcon className={styles["fa-icon"]} icon={faCircleNotch} spin />
                                </div>
                                : <img
                                    src={blobUrl || profileValues.profile_picture
                                    }
                                    referrerPolicy='no-referrer'
                                    alt="No Image"
                                />}
                        </label>
                        {(blobUrl && !isLoading) && <span className={styles["img-delete"]} onClick={deleteImage}>Откажи</span>}
                        <input
                            type="file" value={""} title="Load image"
                            accept="image/*" onChange={detectImage} hidden
                            name="photo" id="photo"
                        />
                    </div>

                    <label htmlFor="first_last_name">Имена</label>
                    <input
                        type="text"
                        {...register("first_last_name", {
                            required: "Посочването на име и фамилия е задължително.",
                            minLength: { value: 2, message: "Посочените име и фамилия трябва да бъдат минимум 2 символа!" },
                            onChange(e) {
                                setProfileValues((state) => ({ ...state, [e.target.name]: e.target.value }));
                            },
                        })}
                        value={profileValues.first_last_name}
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
                                setProfileValues((state) => ({ ...state, [e.target.name]: e.target.value }));
                            },
                        })}
                        value={profileValues.email}
                        placeholder="Вашият имейл адрес"
                    />
                    {errors.email &&
                        <p className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {errors.email.message?.toString()}</p>
                    }

                    <label htmlFor="delivery_address">Адрес за доставка</label>
                    <input
                        type="text"
                        {...register("delivery_address", {
                            onChange(e) {
                                setProfileValues((state) => ({ ...state, [e.target.name]: e.target.value }));
                            },
                        })}
                        value={profileValues.delivery_address}
                        placeholder="гр./с., п.к., ж.к./кв., бул./ул. №"
                    />
                    {errors.delivery_address &&
                        <p className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {errors.delivery_address.message?.toString()}</p>
                    }

                    <label htmlFor="phone_number">Телефонен номер</label>
                    <input
                        type="text"
                        {...register("phone_number", {
                            minLength: { value: 10, message: "Посоченият телефонен номер трябва да бъде минимум 10 символа!" },
                            onChange(e) {
                                setProfileValues((state) => ({ ...state, [e.target.name]: e.target.value }));
                            },
                        })}
                        value={profileValues.phone_number}
                        placeholder="+359 ......."
                    />
                    {errors.phone_number &&
                        <p className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {errors.phone_number.message?.toString()}</p>
                    }
                    {!deleteView 
                    ? <div>
                        <button type="submit" disabled={!isValid || isSubmitting} className={`${styles[`btn-profile`]} ${styles[isValid ? "isValid" : "isNotValid"]}`}>
                            {!isSubmitting ? "Запази" : <FontAwesomeIcon className={styles["fa-icon"]} icon={faCircleNotch} spin />}
                        </button>
                        <button type="button" onClick={toggleEditMode} className={`${styles["btn-profile"]} ${styles["isValid"]}`} disabled={isSubmitting}>
                            ОТКАЖИ
                        </button>
                    </div>
                        : <button type="button" onClick={onDelete} className={`${styles["btn-profile"]} ${styles["isValid"]}`} disabled={isSubmitting}>
                            {!isSubmitting ? "Изтрий" : <FontAwesomeIcon className={styles["fa-icon"]} icon={faCircleNotch} spin />}
                          </button>
                    }
                    {authError && <p className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {authError}</p>}

                    <span >
                        {!deleteView ? 'Искаш ли да изтриеш профила?' : 'Ако си променил решението си, натисни'} <span className={styles["reply"]} onClick={!deleteView ? toggleDeleteView : toggleEditMode}>{!deleteView ? "Да" : "тук"}</span>
                    </span>
                </form>
            </div>}


            {!editMode && <div className={styles["form-container"]}>
                <div>
                    <p className={styles["sign-up"]}>Профил</p>
                    <div className={styles["profile-picture"]}>
                        <div >
                            {isLoading
                                ? <div className={styles["picture-spinner"]}>
                                    <FontAwesomeIcon className={styles["fa-icon"]} icon={faCircleNotch} spin />
                                </div>
                                : <img
                                    src={profileValues.profile_picture
                                    }
                                    referrerPolicy='no-referrer'
                                    alt="No Image"
                                />}
                        </div>
                    </div>

                    <label htmlFor="first_last_name">Имена</label>
                    <input
                        type="text"
                        name="first_last_name"
                        value={profileValues.first_last_name}
                        disabled
                    />

                    <label htmlFor="email">Електронна поща</label>
                    <input
                        type="email"
                        name="email"
                        value={profileValues.email}
                        disabled
                    />

                    <label htmlFor="delivery_address">Адрес за доставка</label>
                    <input
                        type="text"
                        name="delivery_address"
                        value={profileValues.delivery_address}
                        disabled
                    />

                    <label htmlFor="phone_number">Телефонен номер</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={profileValues.phone_number}
                        disabled
                    />

                    <p>{profileValues.owned_books}</p>

                    <button className={`${styles["btn-profile"]} ${styles["isValid"]}`} onClick={toggleEditMode} >
                        РЕДАКТИРАЙ
                    </button>
                    <button type="button" onClick={() => { setOpenPopupChangePassword(true), clearAuthError() }} className={`${styles["btn-profile"]} ${styles["isValid"]}`} >
                        СМЯНА НА ПАРОЛА
                    </button>
                    {(authError && !openPopupChangePassword) && <p className={styles["error-container"]}><FontAwesomeIcon className={styles["fa-icon"]} icon={faExclamationCircle} /> {authError}</p>}
                </div>
            </div>}
            {openPopupChangePassword && (
                <ChangePasswordForm
                    onCloseReset={() => { setOpenPopupChangePassword(false), clearAuthError() }}
                />
            )}
            {(!authError && !!resetMessage && !isSubmitting) && <p className={styles["ok-message"]} >
                <span className={styles["ok-delete"]} onClick={() => setResetMessage("")}><FontAwesomeIcon className={styles["fa-icon"]} icon={faXmarkSquare} /></span>
                <span className={styles['content']}><FontAwesomeIcon className={styles["fa-icon"]} icon={faCheckCircle} /><span>{resetMessage}</span></span>
                <span className={styles["timer"]}></span>
            </p>}
        </>
    )
}