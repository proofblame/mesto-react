import profilePhoto from '../images/jacques-photo.png';
import photoEdit from '../images/edit-avatar.svg';

function Main(props) {




    return (
        <main className="content section section__content">
            <section className="profile section__profile">
                <div className="profile__wrap">
                    <img
                        src={profilePhoto}
                        alt="Портрет Жак-Ива Кусто"
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
                        Жак-Ив Кусто
                    </h1>
                    <button
                        type="button"
                        className="profile__edit-button buttons"
                        onClick={props.onEditProfile}
                    ></button>
                    <p className="profile__author-status section__subtitle">
                        Исследователь океана
                    </p>
                </div>
                <button
                    type="button"
                    className="profile__add-button buttons"
                    onClick={props.onAddPlace}
                ></button>
            </section>

            <section className="elements">
                <ul className="elements__list"></ul>
            </section>
        </main>

        
    );
}

export default Main;
