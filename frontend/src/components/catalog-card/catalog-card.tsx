import { Link } from 'react-router-dom';
import { Guitar } from '../../types/guitar';
import { APIRoute, AppRoute } from '../../const';
import { formatDate } from '../../utils/utils';
import { useAppDispatch } from '../../hooks/hooks';
import { deleteGuitar, fetchGuitars } from '../../store/api-actions';

type CatalogCardProps = {
  guitar: Guitar;
}

function CatalogCard({guitar}: CatalogCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteGuitar(guitar.id));
    dispatch(fetchGuitars());
  };

  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img src={guitar.image} width="36" height="93" alt="Картинка гитары" />
        <div className="catalog-item__data-wrapper">
          <Link className="link" to={`${APIRoute.Guitars}/${guitar.id}`}>
            <p className="catalog-item__data-title">{guitar.name}</p>
          </Link>
          <br />
          <p className="catalog-item__data-date">{`Дата добавления ${formatDate(guitar.postDate as string)}`}</p>
          <p className="catalog-item__data-price">{`${guitar.price} ₽`}</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link className="button button--small button--black-border" to={`${AppRoute.Guitars}/${guitar.id}/${AppRoute.EditProduct}`} aria-label="Редактировать товар">Редактировать</Link>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар" onClick={handleDeleteClick}>Удалить</button>
      </div>
    </li>
  );
}

export default CatalogCard;
