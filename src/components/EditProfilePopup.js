import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(event) {
        event.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="popup-edit-profile"
            title="Редактировать профиль"
            value="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            handleSubmit={handleSubmit}
        >
            <input
                name="name"
                type="text"
                value={name || ""}
                onChange={(evt) => setName(evt.target.value)}
                className="popup__input popup__input_name"
                id="user-name"
                minLength="2"
                maxLength="40"
                required
                autoComplete="off"
            />
            <span id="user-name-error" className="error"></span>
            <input
                name="job"
                type="text"
                value={description || ""}
                onChange={(evt) => setDescription(evt.target.value)}
                className="popup__input popup__input_job"
                id="about"
                minLength="2"
                maxLength="200"
                required
                autoComplete="off"
            />
            <span id="about-error" className="error"></span>
            
        </PopupWithForm>
    );
}

export default EditProfilePopup;
