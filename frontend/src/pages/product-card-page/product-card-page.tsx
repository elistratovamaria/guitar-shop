import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getActiveGuitar, getIsLoading as getGuitarIsLoading } from '../../store/guitar-data/selectors';
import { fetchGuitar } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import NotFoundPage from '../not-found-page/not-found-page';

function ProductCardPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const guitar = useAppSelector(getActiveGuitar);
  const isGuitarLoading = useAppSelector(getGuitarIsLoading);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchGuitar(id));
  }, [dispatch, id]);

  if (isGuitarLoading) {
    return <Spinner />;
  }

  if (!guitar || !id) {
    return <NotFoundPage />;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Guitar Shop. Страница товара</title>
      </Helmet>
      <header className="header--admin header" id="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item">
                  <a className="link main-nav__link" href="main">Каталог</a>
                </li>
                <li className="main-nav__item">
                  <a className="link main-nav__link" href="#">Список товаров</a>
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
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <a className="link" href="./main.html">Главная</a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link" href="./main.html">Каталог</a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">Товар</a>
            </li>
          </ul>
          <section className="product-container">
            <img className="product-container__img" src={guitar.image} width="90" height="235" alt="" />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{guitar.name}</h2>
              <br />
              <br />
              <div className="tabs">
                <a className="button button--medium tabs__button" href="#characteristics">Характеристики</a>
                <a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
                <div className="tabs__content" id="characteristics">
                  <table className="tabs__table">
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{guitar.articleNumber}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">{guitar.guitarType}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{`${guitar.stringAmount} струнная`}</td>
                    </tr>
                  </table>
                  <p className="tabs__product-description hidden">{guitar.description}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductCardPage;
