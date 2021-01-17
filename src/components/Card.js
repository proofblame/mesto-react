function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <li className="elements__item">
            <figure className="element">
                <img
                    src={props.card.link}
                    alt={props.card.name}
                    className="element__image"
                    onClick={handleClick}
                />
                <div className="element__body">
                    <p className="element__figcaption section__subtitle">
                        {props.card.name}
                    </p>
                    <div className="element__like-group">
                        <button
                            className="element__like-button buttons"
                            type="button"
                        ></button>
                        <div className="element__like-count">
                            {props.card.likes.length}
                        </div>
                    </div>
                </div>
                <button
                    className="element__delete-button buttons"
                    type="button"
                ></button>
            </figure>
        </li>
    );
}

export default Card;
