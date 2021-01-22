import React, { useState, useEffect } from "react";
import Card from "./Card";
import api from "../utils/api.js";
import photoEdit from "../images/edit-avatar.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [cards, setCards] = useState([]);

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

    //  Запись данных карточки в шаблон
    const cardList = cards.map((card) => (
        <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
        />
    ));
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

    return (
        <main className="content section section__content">
            <section className="profile section__profile">
                <div className="profile__wrap">
                    <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="profile__avatar"
                    />

                    <img
                        src={photoEdit}
                        alt="Смена аватара"
                        className="profile__avatar-edit"
                        onClick={props.onEditAvatar}
                    />
                </div>

                <div className="profile__info">
                    <h1 className="profile__author section__title">
                        {currentUser.name}
                    </h1>
                    <button
                        type="button"
                        className="profile__edit-button buttons"
                        onClick={props.onEditProfile}
                    ></button>
                    <p className="profile__author-status section__subtitle">
                        {currentUser.about}
                    </p>
                </div>
                <button
                    type="button"
                    className="profile__add-button buttons"
                    onClick={props.onAddPlace}
                ></button>
            </section>

            <section className="elements">
                <ul className="elements__list">{cardList}</ul>
            </section>
        </main>
    );
}

export default Main;
