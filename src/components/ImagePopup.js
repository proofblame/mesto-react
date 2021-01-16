function ImagePopup() {
    return (
        <section className="popup section__popup popup_type_popup-gallery">
            <div className="popup__gallery">
                <img src="" alt="" className="popup__image" />
                <p className="popup__title"></p>
                <button
                    name="close-button"
                    type="button"
                    value=""
                    className="popup__close-button buttons"
                ></button>
            </div>
        </section>
    );
}

export default ImagePopup;
