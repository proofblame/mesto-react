import { useEffect, useContext, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar,
    valueInput,
    descriptionError,
    handleChangeDescription,
    formValid
}) {
    const avatarRef = useRef();
    const currentUser = useContext(CurrentUserContext);

    function handleSubmit(event) {
        event.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    useEffect(() => {
        avatarRef.current.value = currentUser.avatar;
    }, [currentUser]);

    return (
        <PopupWithForm
            name="popup-update-avatar"
            title="Обновить аватар"
            value={valueInput}
            isOpen={isOpen}
            onClose={onClose}
            handleSubmit={handleSubmit}
            formValid={formValid}
        >
            <input
                name="link"
                type="url"
                placeholder="Ссылка на картинку"
                className={`popup__input popup__input_link ${descriptionError ? "popup__input_state_invalid" : ""}`}
                required
                id="link"
                autoComplete="off"
                ref={avatarRef}
                onChange={(event) => {
                    handleChangeDescription(event);
                }}
            />
            <span className="error" id="link-error">{descriptionError}</span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
