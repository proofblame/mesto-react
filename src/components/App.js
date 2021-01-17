import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({isOpen: false});

    function handleCardClick(card) {
        setSelectedCard({
            isOpen: true,
            name: card.name,
            link: card.link
        })
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({isOpen: false})
    }

    return (
        <div className="root">
            <Header />
            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
            />
            <Footer />
            <PopupWithForm
                name="popup-confirm"
                title="Вы уверены?"
                value="Да"
                onClose={closeAllPopups}
            ></PopupWithForm>
            <PopupWithForm
                name="popup-add-card"
                title="Новое место"
                defaultValue="Сохранить"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
            >
                <input
                    name="name"
                    type="text"
                    defaultValue=""
                    placeholder="Название"
                    className="popup__input popup__input_title"
                    minLength="2"
                    maxLength="30"
                    required
                    id="name-card"
                    autoComplete="off"
                />
                <span id="name-card-error" className="error"></span>
                <input
                    name="link"
                    type="url"
                    defaultValue=""
                    placeholder="Ссылка на картинку"
                    className="popup__input popup__input_link"
                    required
                    id="link"
                    autoComplete="off"
                />
                <span className="error" id="link-error"></span>
            </PopupWithForm>
            <PopupWithForm
                name="popup-update-avatar"
                title="Обновить аватар"
                defaultValue="Сохранить"
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            >
                <input
                    name="link"
                    type="url"
                    defaultValue=""
                    placeholder="Ссылка на картинку"
                    className="popup__input popup__input_link"
                    required
                    id="link"
                    autoComplete="off"
                />
                <span className="error" id="link-error"></span>
            </PopupWithForm>
            <PopupWithForm
                name="popup-edit-profile"
                title="Редактировать профиль"
                value="Сохранить"
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
            >
                <input
                    name="name"
                    type="text"
                    defaultValue=""
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
                    defaultValue=""
                    className="popup__input popup__input_job"
                    id="about"
                    minLength="2"
                    maxLength="200"
                    required
                    autoComplete="off"
                />
                <span id="about-error" className="error"></span>
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
    );
}

export default App;
