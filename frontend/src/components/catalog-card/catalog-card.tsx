import { Link } from 'react-router-dom';
import { Guitar } from '../../types/guitar';
import { AppRoute } from '../../const';
import { formatDate } from '../../utils/utils';

type CatalogCardProps = {
  guitar: Guitar;
}

function CatalogCard({guitar}: CatalogCardProps): JSX.Element {
  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img src={guitar.image} width="36" height="93" alt="Картинка гитары" />
        <div className="catalog-item__data-wrapper">
          <Link className="link" to={`${AppRoute.Guitars}/${guitar.id}`}>
            <p className="catalog-item__data-title">{guitar.name}</p>
          </Link>
          <br />
          <p className="catalog-item__data-date">{`Дата добавления ${formatDate(guitar.postDate as string)}`}</p>
          <p className="catalog-item__data-price">{`${guitar.price} ₽`}</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <a className="button button--small button--black-border" href="edit-item.html" aria-label="Редактировать товар">Редактировать</a>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
      </div>
    </li>
  );
}

export default CatalogCard;
