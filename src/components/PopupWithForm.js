function PopupWithForm(props) {
    return (
        <section className={`popup section__popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <form
                    name={props.name}
                    className={`popup__form popup-form_type_${props.name}`}
                    noValidate
                >
                    <h2 className="popup__heading section__subtitle">
                        {props.title}
                    </h2>
                    <fieldset className="popup__fields">
                        {props.children}
                    </fieldset>
                    <input
                        name="save-button"
                        type="submit"
                        defaultValue={props.value}
                        className="popup__save-button"
                    />
                    <button
                        name="close-button"
                        type="button"
                        defaultValue=""
                        className="popup__close-button buttons"
                        onClick={props.onClose}
                    ></button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;
