import { useState } from 'react'
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState();
    const [link, setLink] = useState();

    function handleUseName(event) {
        setName(event.target.value);
    }

    function handleUseLink(event) {
        setLink(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onAddPlace({
            name,
            link,
        })
    }

    return (
        <PopupWithForm
            name="popup-add-card"
            title="Новое место"
            value="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            handleSubmit={handleSubmit}
        >
            <input
                name="name"
                type="text"
                value={name}
                placeholder="Название"
                className="popup__input popup__input_title"
                minLength="2"
                maxLength="30"
                required
                id="name-card"
                autoComplete="off"
                onChange={handleUseName}
            />
            <span id="name-card-error" className="error"></span>
            <input
                name="link"
                type="url"
                value={link}
                placeholder="Ссылка на картинку"
                className="popup__input popup__input_link"
                required
                id="link"
                autoComplete="off"
                onChange={handleUseLink}
            />
            <span className="error" id="link-error"></span>
            
        </PopupWithForm>
    );
}

export default AddPlacePopup;
