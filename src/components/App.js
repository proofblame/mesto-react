import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ConfirmPopup from "./ConfirmPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(false);
    const [deleteCard, setDeleteCard] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [valueInput, setValueInput] = useState({
        submit: "Сохранить",
        confirm: "Да",
    });

    const [nameError, setNameError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [formValid, setFormValid] = useState(false);

    // Валидация изменения имени и названия
    function handleChangeName(event) {
        if (event.target.checkValidity()) {
            setNameError("");
        } else {
            setNameError(event.target.validationMessage);
        }
    }
    // Валидация изменения описания и ссылок
    function handleChangeDescription(event) {
        if (event.target.checkValidity()) {
            setDescriptionError("");
        } else {
            setDescriptionError(event.target.validationMessage);
        }
    }

    useEffect(() => {
        if (nameError || descriptionError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [
        isEditProfilePopupOpen,
        isAddPlacePopupOpen,
        isEditAvatarPopupOpen,
        nameError,
        descriptionError,
    ]);

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

    //  Закрытие попапа по Esc и клику на оверлей
    useEffect(() => {
        function handleEscClose(event) {
            if (event.key === "Escape") {
                closeAllPopups();
            }
        }

        function handleClickOnOverlay(event) {
            const popup = document.querySelector(".popup_opened");
            if (event.target !== popup) {
                return;
            }
            closeAllPopups();
        }

        document.addEventListener("click", handleClickOnOverlay);
        document.addEventListener("keydown", handleEscClose);

        return () => {
            document.removeEventListener("keydown", handleEscClose);
            document.removeEventListener("click", handleClickOnOverlay);
        };
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
        setValueInput({
            ...valueInput,
            confirm: "Сохранение...",
        });
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== card._id);
                setCards(newCards);
            })
            .then(() => {
                setIsConfirmPopupOpen(false);
                setValueInput({
                    ...valueInput,
                    confirm: "Сохранить",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //  Добавить карточку
    function handleAddPlaceSubmit({ name, link }) {
        setValueInput({
            ...valueInput,
            submit: "Сохранение...",
        });
        api.addNewCard(name, link)
            .then((card) => {
                setCards([card, ...cards]);
            })
            .then(() => {
                setValueInput({
                    ...valueInput,
                    submit: "Сохранить",
                });
                setIsAddPlacePopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    //  Обновить аватар
    function handleUpdateAvatar({ avatar }) {
        setValueInput({
            ...valueInput,
            submit: "Сохранение...",
        });
        api.setUserAvatar(avatar)
            .then(() => {
                setCurrentUser({
                    ...currentUser,
                    avatar: avatar,
                });
            })
            .then(() => {
                setIsEditAvatarPopupOpen(false);
                setValueInput({
                    ...valueInput,
                    submit: "Сохранить",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    //  Обновить данные пользователя
    function handleUpdateUser({ name, about }) {
        setValueInput({
            ...valueInput,
            submit: "Сохранение...",
        });
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
                setValueInput({
                    ...valueInput,
                    submit: "Сохранить",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    //  Присвоить значения карточке
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    //  Открыть попап редактирования профиля
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    //  Открыть попап добавдения новой карточки
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    //  Открыть попап редактирования аватара
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    //  Открыть попап подтверждения удаления карточки
    function handleDeleteButtonClick(card) {
        setIsConfirmPopupOpen(true);
        setDeleteCard(card);
    }
    //  Закрыть все попапы
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(false);
        setIsConfirmPopupOpen(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onConfirmDelete={handleDeleteButtonClick}
                />
                <Footer />
                <ConfirmPopup
                    isOpen={isConfirmPopupOpen}
                    onClose={closeAllPopups}
                    onCardDelete={handleCardDelete}
                    card={deleteCard}
                    valueInput={valueInput.confirm}
                    formValid={formValid}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    valueInput={valueInput.submit}
                    nameError={nameError}
                    descriptionError={descriptionError}
                    handleChangeName={handleChangeName}
                    handleChangeDescription={handleChangeDescription}
                    formValid={formValid}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    valueInput={valueInput.submit}
                    descriptionError={descriptionError}
                    handleChangeDescription={handleChangeDescription}
                    formValid={formValid}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    valueInput={valueInput.submit}
                    nameError={nameError}
                    descriptionError={descriptionError}
                    handleChangeName={handleChangeName}
                    handleChangeDescription={handleChangeDescription}
                    formValid={formValid}
                />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
