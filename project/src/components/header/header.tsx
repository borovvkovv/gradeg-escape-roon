import { memo } from 'react';
import { Link } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { endSessionAction } from '../../store/api-actions';
import { getAuthorizationInfo } from '../../store/user-process/selectors';

type HeaderProps = {
  currentPage: AppRoute;
}
function Header({ currentPage }: HeaderProps): JSX.Element {
  const userInfo = useAppSelector(getAuthorizationInfo);

  const dispatch = useAppDispatch();

  return (
    <header className='header'>
      <div className='container container--size-l'>
        {currentPage === AppRoute.Root ? (
          <span
            className='logo header__logo'
          >
            <svg
              width='134'
              height='52'
              aria-hidden='true'
            >
              <use xlinkHref='#logo'></use>
            </svg>
          </span>
        ) : (
          <Link
            className='logo header__logo'
            to={AppRoute.Root}
            aria-label='Перейти на Главную'
          >
            <svg
              width='134'
              height='52'
              aria-hidden='true'
            >
              <use xlinkHref='#logo'></use>
            </svg>
          </Link>
        )}
        <nav className='main-nav header__main-nav'>
          <ul className='main-nav__list'>
            <li className='main-nav__item'>
              <Link
                className={`link ${
                  currentPage === AppRoute.Root ? 'active' : ''
                }`}
                to={AppRoute.Root}
              >
                Квесты
              </Link>
            </li>
            <li className='main-nav__item'>
              <Link
                className={`link ${
                  currentPage === AppRoute.Contacts ? 'active' : ''
                }`}
                to={AppRoute.Contacts}
              >
                Контакты
              </Link>
            </li>
            {userInfo && (
              <li className='main-nav__item'>
                <Link
                  className={`link ${
                    currentPage === AppRoute.MyBookings ? 'active' : ''
                  }`}
                  to={AppRoute.MyBookings}
                >
                  Мои бронирования
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className='header__side-nav'>
          {userInfo && (
            <Link
              className='btn btn--accent header__side-item'
              to='/'
              onClick={(evt) => {
                dispatch(endSessionAction());
                evt.preventDefault();
              }}
            >
              Выйти
            </Link>
          )}
          {!userInfo && (
            <Link
              className='btn header__side-item header__login-btn'
              to={AppRoute.Login}
              state={{ prevPath: browserHistory.location.pathname }}
            >
              Вход
            </Link>
          )}
          <a
            className='link header__side-item header__phone-link'
            href='tel:88003335599'
          >
            8 (000) 111-11-11
          </a>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
