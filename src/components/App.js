import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    function handleUpdateAvatar({ avatar }) {
        api.setUserAvatar(avatar)
            .then(() => {
                setCurrentUser({
                    ...currentUser,
                    avatar: avatar,
                });
            })
            .then(() => {
                setIsEditAvatarPopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateUser({ name, about }) {
        api.setUserInfo(name, about)
            .then(() => {
                setCurrentUser({
                    ...currentUser,
                    name: name,
                    about: about,
                });
            })
            .then(() => {
                setIsEditProfilePopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardClick(card) {
        setSelectedCard({
            name: card.name,
            link: card.link,
        });
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
        setSelectedCard(false);
    }

    useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
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
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
