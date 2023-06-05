import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getActiveGuitar, getIsLoading as getGuitarIsLoading } from '../../store/guitar-data/selectors';
import { fetchGuitar } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import NotFoundPage from '../not-found-page/not-found-page';
import { formatDate } from '../../utils/utils';
import { AppRoute } from '../../const';

function EditProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  if (!guitar) {
    return <NotFoundPage />;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Guitar Shop. Редактирование товара</title>
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
      </header >
      <main className="page-content">
        <section className="edit-item">
          <div className="container">
            <h1 className="edit-item__title">{guitar.name}</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item">
                <a className="link" href="./main.html">Вход</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="link">Товары</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="link">{guitar.name}</a>
              </li>
            </ul>
            <form className="edit-item__form" action="#" method="get">
              <div className="edit-item__form-left">
                <div className="edit-item-image edit-item__form-image">
                  <div className="edit-item-image__image-wrap">
                    <img className="edit-item-image__image" src={guitar.image}srcSet="img/content/add-item-1@2x.png 2x" width="133" height="332" alt={guitar.name} />
                  </div>
                  <div className="edit-item-image__btn-wrap">
                    <button className="button button--small button--black-border edit-item-image__btn">Заменить</button>
                    <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
                  </div>
                </div>
                <div className="input-radio edit-item__form-radio">
                  <span>Тип товара</span>
                  <input type="radio" id="guitar" name="item-type" value="guitar" />
                  <label htmlFor="guitar">Акустическая гитара</label>
                  <input type="radio" id="el-guitar" name="item-type" value="el-guitar" />
                  <label htmlFor="el-guitar">Электрогитара</label>
                  <input type="radio" id="ukulele" name="item-type" value="ukulele" />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
                <div className="input-radio edit-item__form-radio">
                  <span>Количество струн</span>
                  <input type="radio" id="string-qty-4" name="string-qty" value="4" />
                  <label htmlFor="string-qty-4">4</label>
                  <input type="radio" id="string-qty-6" name="string-qty" value="6" />
                  <label htmlFor="string-qty-6">6</label>
                  <input type="radio" id="string-qty-7" name="string-qty" value="7" />
                  <label htmlFor="string-qty-7">7</label>
                  <input type="radio" id="string-qty-12" name="string-qty" value="12" />
                  <label htmlFor="string-qty-12">12</label>
                </div>
              </div>
              <div className="edit-item__form-right">
                <div className="custom-input edit-item__form-input">
                  <label>
                    <span>Дата добавления товара</span>
                    <input type="text" name="date" defaultValue={formatDate(guitar.postDate?.toString() as string)} placeholder="Дата в формате 00.00.0000" readOnly />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input edit-item__form-input">
                  <label>
                    <span>Наименование товара</span>
                    <input type="text" name="title" defaultValue={guitar.name} placeholder="Наименование" />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input edit-item__form-input edit-item__form-input--price">
                  <label>
                    <span>Цена товара</span>
                    <input type="text" name="price" defaultValue={guitar.price} placeholder="Цена в формате 00 000" />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input edit-item__form-input">
                  <label>
                    <span>Артикул товара</span>
                    <input type="text" name="sku" defaultValue={guitar.articleNumber} placeholder="Артикул товара" />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-textarea edit-item__form-textarea">
                  <label>
                    <span>Описание товара</span>
                    <textarea name="description" placeholder="" defaultValue={guitar.description}></textarea>
                  </label>
                  <p>Заполните поле</p>
                </div>
              </div>
              <div className="edit-item__form-buttons-wrap">
                <button className="button button--small edit-item__form-button" type="submit">Сохранить изменения</button>
                <button className="button button--small edit-item__form-button" type="button" onClick={() => navigate(AppRoute.Guitars)}>Вернуться к списку товаров</button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default EditProductPage;
