function ImagePopup(props) {
    return (
        <section className={`popup section__popup popup_type_popup-gallery ${props.card.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__gallery">
                <img src={props.card.link} alt={props.card.name} className="popup__image" />
                <p className="popup__title">{props.card.name}</p>
                <button
                    name="close-button"
                    type="button"
                    className="popup__close-button buttons"
                    onClick={props.onClose}
                ></button>
            </div>
        </section>
    );
}

export default ImagePopup;
