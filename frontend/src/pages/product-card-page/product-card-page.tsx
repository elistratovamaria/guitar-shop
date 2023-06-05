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
import UserBlock from '../../components/user-block/user-block';
import TabsList from '../../components/tabs-list/tabs-list';

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
            <UserBlock />
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
              <TabsList guitar={guitar} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductCardPage;
