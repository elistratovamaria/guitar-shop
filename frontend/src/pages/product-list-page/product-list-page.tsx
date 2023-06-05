import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import CatalogCard from '../../components/catalog-card/catalog-card';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { getGuitars, getIsLoading as getGuitarsIsLoading} from '../../store/guitars-data/selectors';
import { fetchGuitars } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';

function ProductListPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isGuitarsLoading = useAppSelector(getGuitarsIsLoading);
  const guitars = useAppSelector(getGuitars);

  useEffect(() => {
    dispatch(fetchGuitars());
  }, [dispatch]);

  if (isGuitarsLoading) {
    return <Spinner />;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Guitar Shop. Список товаров</title>
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
        <section className="product-list">
          <div className="container">
            <h1 className="product-list__title">Список товаров</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item"><a className="link" href="./main.html">Вход</a>
              </li>
              <li className="breadcrumbs__item"><a className="link">Товары</a>
              </li>
            </ul>
            <div className="catalog">
              <form className="catalog-filter" action="#" method="post">
                <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
                <fieldset className="catalog-filter__block">
                  <legend className="catalog-filter__block-title">Тип гитар</legend>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" />
                    <label htmlFor="acoustic">Акустические гитары</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="electric" name="electric" checked />
                    <label htmlFor="electric">Электрогитары</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" checked />
                    <label htmlFor="ukulele">Укулеле</label>
                  </div>
                </fieldset>
                <fieldset className="catalog-filter__block">
                  <legend className="catalog-filter__block-title">Количество струн</legend>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" checked />
                    <label htmlFor="4-strings">4</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" checked />
                    <label htmlFor="6-strings">6</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" />
                    <label htmlFor="7-strings">7</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled />
                    <label htmlFor="12-strings">12</label>
                  </div>
                </fieldset>
                <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
              </form>
              <div className="catalog-sort">
                <h2 className="catalog-sort__title">Сортировать:</h2>
                <div className="catalog-sort__type">
                  <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по цене">по дате</button>
                  <button className="catalog-sort__type-button" aria-label="по цене">по цене</button>
                </div>
                <div className="catalog-sort__order">
                  <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию"></button>
                  <button className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active" aria-label="По убыванию"></button>
                </div>
              </div>
              <div className="catalog-cards">
                <ul className="catalog-cards__list">
                  {guitars.map((guitar) => <CatalogCard key={guitar.id} guitar={guitar}/>)}
                </ul>
              </div>
            </div>
            <button className="button product-list__button button--red button--big">Добавить новый товар</button>
            <div className="pagination product-list__pagination">
              <ul className="pagination__list">
                <li className="pagination__page pagination__page--active">
                  <a className="link pagination__page-link" href="1">1</a>
                </li>
                <li className="pagination__page">
                  <a className="link pagination__page-link" href="2">2</a>
                </li>
                <li className="pagination__page">
                  <a className="link pagination__page-link" href="3">3</a>
                </li>
                <li className="pagination__page pagination__page--next" id="next">
                  <a className="link pagination__page-link" href="2">Далее</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ProductListPage;
