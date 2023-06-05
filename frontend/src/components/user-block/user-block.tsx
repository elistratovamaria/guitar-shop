import { useAppSelector } from '../../hooks/hooks';
import { getIsAuth, getUser } from '../../store/user-data/selectors';

function UserBlock(): JSX.Element {
  const isAuth = useAppSelector(getIsAuth);
  const user = useAppSelector(getUser);

  return (
    <div className="header__container">
      {isAuth && user ? (
        <>
          <span className="header__user-name">{user.email}</span>
          <a className="header__link" href="login.html" aria-label="Перейти в личный кабинет">
            <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
              <use xlinkHref="#icon-account"></use>
            </svg>
            <span className="header__link-text">Вход</span>
          </a>
        </>
      ) : (
        <a className="header__link" href="login.html" aria-label="Перейти в личный кабинет">
          <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
            <use xlinkHref="#icon-account"></use>
          </svg>
          <span className="header__link-text">Вход</span>
        </a>
      )}
    </div >
  );
}

export default UserBlock;
