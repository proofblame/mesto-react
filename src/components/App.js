import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    
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
    }

    return (
        <div className="root">
            <Header />
            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                
            />
            <Footer />
            <PopupWithForm name="popup-confirm" title="Вы уверены?" />
            <PopupWithForm name="popup-add-card" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
            <PopupWithForm name="popup-update-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
            <PopupWithForm
                name="popup-edit-profile"
                title="Редактировать профиль"
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
            />
            <ImagePopup />
            <section className="popup section__popup popup_type_popup-add-card">
                <div className="popup__container">
                    <form
                        name="new-card"
                        className="popup__form popup-form_type_add-card"
                        novalidate
                    >
                        <h2 className="popup__heading section__subtitle">
                            Новое место
                        </h2>
                        <fieldset className="popup__fields">
                            <input
                                name="name"
                                type="text"
                                value=""
                                placeholder="Название"
                                className="popup__input popup__input_title"
                                minlength="2"
                                maxlength="30"
                                required
                                id="name-card"
                                autocomplete="off"
                            />
                            <span id="name-card-error" className="error"></span>
                            <input
                                name="link"
                                type="url"
                                value=""
                                placeholder="Ссылка на картинку"
                                className="popup__input popup__input_link"
                                required
                                id="link"
                                autocomplete="off"
                            />
                            <span className="error" id="link-error"></span>
                        </fieldset>
                        <input
                            name="save-button"
                            type="submit"
                            value="Сохранить"
                            className="popup__save-button"
                        />
                        <button
                            name="close-button"
                            type="button"
                            value=""
                            className="popup__close-button buttons"
                        ></button>
                    </form>
                </div>
            </section>
            <section className="popup section__popup popup_type_popup-edit-profile">
                <div className="popup__container">
                    <form
                        name="edit-user"
                        className="popup__form popup-form_type_edit-profile"
                        novalidate
                    >
                        <h2 className="popup__heading section__subtitle">
                            Редактировать профиль
                        </h2>
                        <fieldset className="popup__fields">
                            <input
                                name="name"
                                type="text"
                                value=""
                                className="popup__input popup__input_name"
                                id="user-name"
                                minlength="2"
                                maxlength="40"
                                required
                                autocomplete="off"
                            />
                            <span id="user-name-error" className="error"></span>
                            <input
                                name="job"
                                type="text"
                                value=""
                                className="popup__input popup__input_job"
                                id="about"
                                minlength="2"
                                maxlength="200"
                                required
                                autocomplete="off"
                            />
                            <span id="about-error" className="error"></span>
                        </fieldset>
                        <input
                            name="save-button"
                            type="submit"
                            value="Сохранить"
                            className="popup__save-button"
                        />
                        <button
                            name="close-button"
                            type="button"
                            value=""
                            className="popup__close-button buttons"
                        ></button>
                    </form>
                </div>
            </section>
            <section className="popup section__popup popup_type_popup-confirm">
                <div className="popup__container">
                    <form
                        name="delete-confirm"
                        className="popup__form popup-form_type_delete-confirm"
                        novalidate
                    >
                        <h2 className="popup__heading section__subtitle">
                            Вы уверены?
                        </h2>
                        <input
                            name="save-button"
                            type="submit"
                            value="Да"
                            className="popup__save-button"
                        />
                        <button
                            name="close-button"
                            type="button"
                            value=""
                            className="popup__close-button buttons"
                        ></button>
                    </form>
                </div>
            </section>
            <section className="popup section__popup popup_type_popup-update-avatar">
                <div className="popup__container">
                    <form
                        name="update-user"
                        className="popup__form popup-form_type_update-avatar"
                        novalidate
                    >
                        <h2 className="popup__heading section__subtitle">
                            Обновить аватар
                        </h2>
                        <fieldset className="popup__fields">
                            <input
                                name="link"
                                type="url"
                                value=""
                                placeholder="Ссылка на картинку"
                                className="popup__input popup__input_link"
                                required
                                id="link"
                                autocomplete="off"
                            />
                            <span className="error" id="link-error"></span>
                        </fieldset>
                        <input
                            name="save-button"
                            type="submit"
                            value="Сохранить"
                            className="popup__save-button"
                        />
                        <button
                            name="close-button"
                            type="button"
                            value=""
                            className="popup__close-button buttons"
                        ></button>
                    </form>
                </div>
            </section>{" "}
            */}
            <template className="elements__items">
                <li className="elements__item">
                    <figure className="element">
                        <img src="" alt="" className="element__image" />
                        <div className="element__body">
                            <p className="element__figcaption section__subtitle"></p>
                            <div className="element__like-group">
                                <button
                                    className="element__like-button buttons"
                                    type="button"
                                ></button>
                                <div className="element__like-count"></div>
                            </div>
                        </div>
                        <button
                            className="element__delete-button buttons"
                            type="button"
                        ></button>
                    </figure>
                </li>
            </template>
        </div>
    );
}

export default App;
