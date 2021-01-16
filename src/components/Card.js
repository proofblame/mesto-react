function Card(props) {
    function handleClick() {
        props.onCardClick(props.value);
    }

    return (
        <li className="elements__item">
            <figure className="element">
                <img
                    src={props.value.link}
                    alt={props.value.name}
                    className="element__image"
                    onClick={() => handleClick(props.value)}
                />
                <div className="element__body">
                    <p className="element__figcaption section__subtitle">
                        {props.value.name}
                    </p>
                    <div className="element__like-group">
                        <button
                            className="element__like-button buttons"
                            type="button"
                        ></button>
                        <div className="element__like-count">
                            {props.value.likes.length}
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
