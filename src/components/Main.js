import React, { useState, useEffect } from "react";
import Card from './Card';
import api from "../utils/api.js";
import profilePhoto from "../images/jacques-photo.png";
import photoEdit from "../images/edit-avatar.svg";

function Main(props) {
    const [userName, setUserName] = useState("Жак-Ив Кусто");
    const [userDescription, setUserDescription] = useState(
        "Исследователь океана"
    );
    const [userAvatar, setUserAvatar] = useState(profilePhoto);
    const [cards, setCards] = useState([]);

    // Получение данных пользователя с сервера
    useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    // Получение карточек с сервера
    useEffect(() => {
        api.getInitialCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    //  Запись данных карточки в шаблон
    const cardList = cards.map((card) => (
        <Card key={card._id} value={card} onCardClick={props.onCardClick}/>
    ));

    return (
        <main className="content section section__content">
            <section className="profile section__profile">
                <div className="profile__wrap">
                    <img
                        src={userAvatar}
                        alt={userName}
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
                        {userName}
                    </h1>
                    <button
                        type="button"
                        className="profile__edit-button buttons"
                        onClick={props.onEditProfile}
                    ></button>
                    <p className="profile__author-status section__subtitle">
                        {userDescription}
                    </p>
                </div>
                <button
                    type="button"
                    className="profile__add-button buttons"
                    onClick={props.onAddPlace}
                ></button>
            </section>

            <section className="elements">
                <ul className="elements__list">
                    {cardList}
                </ul>
            </section>
        </main>
    );
}

export default Main;
