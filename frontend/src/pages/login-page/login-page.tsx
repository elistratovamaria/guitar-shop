import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getIsAuth } from '../../store/user-data/selectors';
import { login } from '../../store/api-actions';
import UserBlock from '../../components/user-block/user-block';


function LoginPage(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);

  if (isAuth) {
    return <Navigate to={AppRoute.Guitars} />;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="wrapper">
      <Helmet>
        <title>Guitar Shop. Авторизация</title>
      </Helmet>
      <header className="header" id="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
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
            <UserBlock />
          </div>
        </div>
      </header>
      <main className="page-content">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Войти</h1>
            <p className="login__text">Hовый пользователь? <a className="login__link" href="registration.html">Зарегистрируйтесь</a> прямо сейчас</p>
            <form method="post" action="#" onSubmit={handleSubmit}>
              <div className="input-login">
                <label htmlFor="email">Введите e-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                  required
                />
                <p className="input-login__error">Заполните поле</p>
              </div>
              <div className="input-login">
                <label htmlFor="passwordLogin">Введите пароль</label>
                <span>
                  <input
                    type="password"
                    placeholder="• • • • • • • • • • • •"
                    id="passwordLogin"
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                    required
                  />
                  <button className="input-login__button-eye" type="button">
                    <svg width="14" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-eye"></use>
                    </svg>
                  </button>
                </span>
                <p className="input-login__error">Заполните поле</p>
              </div>
              <button className="button login__button button--medium" type="submit">Войти</button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;
