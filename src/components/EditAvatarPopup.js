import { useEffect, useContext, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
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
            value="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            handleSubmit={handleSubmit}
        >
            <input
                name="link"
                type="url"
                placeholder="Ссылка на картинку"
                className="popup__input popup__input_link"
                required
                id="link"
                autoComplete="off"
                ref={avatarRef}
            />
            <span className="error" id="link-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
