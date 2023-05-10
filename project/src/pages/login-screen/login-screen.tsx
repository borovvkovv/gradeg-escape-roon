import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import Header from '../../components/header/header';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { redirectToRoute } from '../../store/action';
import { getAuthorizationStatusAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Credentials, LocationState } from '../../types/user';
import { hasLetterAndNumber } from '../../utils';

type Inputs = {
  login: string;
  password: string;
  agreement: boolean;
};

function LoginScreen(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    criteriaMode: 'all',
  });

  const location = useLocation();
  const locationState = location.state as LocationState;
  const dispatch = useAppDispatch();

  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (!locationState && authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  });

  const onSubmit = () => {
    dispatch(
      getAuthorizationStatusAction({
        ...credentials,
        ...locationState,
      })
    );
  };

  function handleEmailChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setCredentials({
      ...credentials,
      email: evt.currentTarget.value,
    });
  }

  function handlePasswordChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setCredentials({
      ...credentials,
      password: evt.currentTarget.value,
    });
  }

  return (
    <>
      <Header currentPage={AppRoute.Login} />
      <main className='decorated-page login'>
        <div
          className='decorated-page__decor'
          aria-hidden='true'
        >
          <picture>
            <source
              type='image/webp'
              srcSet='img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x'
            />
            <img
              src='img/content/maniac/maniac-size-m.jpg'
              srcSet='img/content/maniac/maniac-size-m@2x.jpg 2x'
              width='1366'
              height='768'
              alt=''
            />
          </picture>
        </div>
        <div className='container container--size-l'>
          <div className='login__form'>
            <form
              className='login-form'
              onSubmit={(event) => void handleSubmit(onSubmit)(event)}
            >
              <div className='login-form__inner-wrapper'>
                <h1 className='title title--size-s login-form__title'>Вход</h1>
                <div className='login-form__inputs'>
                  <div className='custom-input login-form__input'>
                    <label
                      className='custom-input__label'
                      htmlFor='email'
                    >
                      E&nbsp;&ndash;&nbsp;mail
                    </label>
                    <input
                      {...register('login', {
                        required: 'Обязательное поле',
                      })}
                      type='email'
                      id='email'
                      placeholder='Адрес электронной почты'
                      value={credentials.email}
                      onChange={handleEmailChange}
                    />
                    {errors.login && (
                      <span style={{ color: 'red' }}>
                        {errors.login?.message}
                      </span>
                    )}
                  </div>
                  <div className='custom-input login-form__input'>
                    <label
                      className='custom-input__label'
                      htmlFor='password'
                    >
                      Пароль
                    </label>
                    <input
                      {...register('password', {
                        required: 'Обязательное поле',
                        minLength: {
                          value: 3,
                          message: 'Минимум 3 символа',
                        },
                        validate: {
                          hasLetterAndNumber: (v) =>
                            hasLetterAndNumber(v) ||
                            'Строка должна сожержать хотя бы одну букву и одну цифру',
                        },
                      })}
                      type='password'
                      id='password'
                      placeholder='Пароль'
                      value={credentials.password}
                      onChange={handlePasswordChange}
                    />
                    {errors.password && (
                      <span style={{ color: 'red' }}>
                        {errors.password?.message}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  className='btn btn--accent btn--general login-form__submit'
                  type='submit'
                >
                  Войти
                </button>
              </div>
              <label className='custom-checkbox login-form__checkbox'>
                <input
                  {...register('agreement', {
                    required: 'Необходимо поставить галочку',
                  })}
                  type='checkbox'
                  id='id-order-agreement'
                />
                <span className='custom-checkbox__icon'>
                  <svg
                    width='20'
                    height='17'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#icon-tick'></use>
                  </svg>
                </span>
                <span className='custom-checkbox__label'>
                  Я&nbsp;согласен с
                  <a
                    className='link link--active-silver link--underlined'
                    href='/'
                  >
                    правилами обработки персональных данных
                  </a>
                  &nbsp;и пользовательским соглашением
                </span>
              </label>
              {errors.agreement && (
                <span style={{ color: 'red' }}>
                  {errors.agreement?.message}
                </span>
              )}
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default LoginScreen;
