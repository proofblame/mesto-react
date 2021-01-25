import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
// import PopupWithForm from "./PopupWithForm";
import AddPlacePopup from "./AddPlacePopup";


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    // Получение данных пользователя с сервера
    useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Получение карточек с сервера
    useEffect(() => {
        api.getInitialCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //  Поставить/снять лайк
    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            const newCards = cards.map((c) =>
                c._id === card._id ? newCard : c
            );
            setCards(newCards);
        });
    }

    //  Удалить карточку
    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            const newCards = cards.filter((c) => c._id !== card._id);
            setCards(newCards);
        });
    }
    //  Добавить карточку
    function handleAddPlaceSubmit({ name, link }) {
        api.addNewCard(name, link)
            .then((card) => {
                setCards([card, ...cards]);
            })
            .then(() => {
                setIsAddPlacePopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    //  Обновить аватар
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
    //  Обновить данные пользователя
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
    //  Открыть/закрыть карточку
    function handleCardClick(card) {
        setSelectedCard(card);
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

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <Header />
                {currentUser && (
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                )}
                <Footer />

                {/* <PopupWithForm
                    name="popup-confirm"
                    title="Вы уверены?"
                    value="Да"
                ></PopupWithForm> */}
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
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
