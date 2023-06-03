import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';

function RegisterPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Helmet>
        <title>Guitar Shop. Регистрация</title>
      </Helmet>
      <header className="header" id="header">
        <div className="container">
          <div className="header__wrapper">
            <a className="header__logo logo" href="main.html">
              <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" />
            </a>
            <nav className="main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item">
                  <a className="link main-nav__link" href="#">Каталог</a>
                </li>
                <li className="main-nav__item">
                  <a className="link main-nav__link" href="#">Где купить?</a>
                </li>
                <li className="main-nav__item">
                  <a className="link main-nav__link" href="#">О компании</a>
                </li>
              </ul>
            </nav>
            <div className="header__container">
              <span className="header__user-name">Имя</span>
              <a className="header__link" href="login.html" aria-label="Перейти в личный кабинет">
                <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-account"></use>
                </svg>
                <span className="header__link-text">Вход</span>
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="page-content">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Регистрация</h1>
            <form method="post" action="/">
              <div className="input-login">
                <label htmlFor="name">Введите имя</label>
                <input type="text" id="name" name="name" autoComplete="off" required />
                <p className="input-login__error">Заполните поле</p>
              </div>
              <div className="input-login">
                <label htmlFor="email">Введите e-mail</label>
                <input type="email" id="email" name="email" autoComplete="off" required />
                <p className="input-login__error">Заполните поле</p>
              </div>
              <div className="input-login">
                <label htmlFor="password">Придумайте пароль</label>
                <span>
                  <input type="password" placeholder="• • • • • • • • • • • •" id="password" name="password" autoComplete="off" required />
                  <button className="input-login__button-eye" type="button">
                    <svg width="14" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-eye"></use>
                    </svg>
                  </button>
                </span>
                <p className="input-login__error">Заполните поле</p>
              </div>
              <button className="button login__button button--medium" type="submit">Зарегистрироваться</button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RegisterPage;
