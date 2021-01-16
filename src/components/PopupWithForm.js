function PopupWithForm(props) {
    return (
        <section className={`popup section__popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <form
                    name={props.name}
                    className="popup__form popup-form_type_edit-profile"
                    novalidate
                >
                    <h2 className="popup__heading section__subtitle">
                        {props.title}
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
                        onClick={props.onClose}
                    ></button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;
