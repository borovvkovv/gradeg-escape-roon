import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import BookingTimeSlot from '../../components/booking-time-slot/booking-time-slot';
import GeoMap from '../../components/geo-map/geo-map';
import { AppRoute, BookingDate } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { bookQuestAction } from '../../store/api-actions';
import {
  getBookingInfoList,
  getIsBookingInfoLoading,
  getQuest,
} from '../../store/data-process/selectors';
import { BookingDataInput, BookingScreenInputs } from '../../types/booking';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundSreen from '../not-found-screen/not-found-screen';
import { useForm } from 'react-hook-form';
import Header from '../../components/header/header';
import useGetQuestBooking from '../../hooks/use-get-quest-booking';
import useCurrentBookingInfoId from '../../hooks/use-current-booking-info';
import { getElementById } from '../../utils';

function BookingScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const idAsString = useGetQuestBooking();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingScreenInputs>({
    criteriaMode: 'all',
  });

  const quest = useAppSelector(getQuest);
  const bookingInfoList = useAppSelector(getBookingInfoList);
  const isBookingInfoLoading = useAppSelector(getIsBookingInfoLoading);

  const [chosenReservation, setChosenReservation] = useState<BookingDataInput>({
    contactPerson: '',
    phone: '',
    withChildren: false,
    peopleCount: 0,
    date: BookingDate.Today,
    time: '',
    placeId: '',
  });


  const { currentBookingInfoId, setCurrentBookingInfoId } =
    useCurrentBookingInfoId(bookingInfoList);

  const currentBookingInfo = useMemo(
    () => getElementById(bookingInfoList, currentBookingInfoId ?? ''),
    [bookingInfoList, currentBookingInfoId]
  );

  useEffect(() => {
    if (
      currentBookingInfo &&
      currentBookingInfo.id !== chosenReservation.placeId
    ) {
      setChosenReservation({
        ...chosenReservation,
        placeId: currentBookingInfo.id,
      });
    }
  }, [currentBookingInfo, chosenReservation]);


  if (!idAsString) {
    return <NotFoundSreen />;
  }

  if (isBookingInfoLoading) {
    return <LoadingScreen />;
  }

  if (bookingInfoList.length <= 0 || !quest) {
    return <NotFoundSreen />;
  }

  const onSubmit = () => {
    if (currentBookingInfoId) {
      dispatch(
        bookQuestAction({
          bookingDataInput: chosenReservation,
          questId: String(idAsString),
        })
      );
    }
  };

  function handleContactPersonChange(target: HTMLInputElement) {
    setChosenReservation({
      ...chosenReservation,
      contactPerson: target.value,
    });
  }

  function handlePhoneChange(target: HTMLInputElement) {
    setChosenReservation({
      ...chosenReservation,
      phone: target.value,
    });
  }

  function handleParticipantsNumberChange(target: HTMLInputElement) {
    setChosenReservation({
      ...chosenReservation,
      peopleCount: Number(target.value),
    });
  }

  function handleWithChildrenChange(target: HTMLInputElement) {
    setChosenReservation({
      ...chosenReservation,
      withChildren: target.checked,
    });
  }

  function handleMarkerClick(placeId: string) {
    setCurrentBookingInfoId(placeId);
    setChosenReservation({
      ...chosenReservation,
      time: '',
      placeId
    });
  }

  function handleTimeChange(bookingDate: BookingDate, bookingTime: string) {
    setChosenReservation({
      ...chosenReservation,
      date: bookingDate,
      time: bookingTime,
    });
  }

  return (
    <>
      <Header currentPage={AppRoute.Booking} />
      <main className='page-content decorated-page'>
        <div
          className='decorated-page__decor'
          aria-hidden='true'
        >
          <picture>
            <source
              type='image/webp'
              srcSet='/img/content/maniac/maniac-bg-size-m.webp, build/img/content/maniac/maniac-bg-size-m@2x.webp 2x'
            />
            <img
              src='img/content/maniac/maniac-bg-size-m.jpg'
              srcSet='img/content/maniac/maniac-bg-size-m@2x.jpg 2x'
              width='1366'
              height='1959'
              alt=''
            />
          </picture>
        </div>
        <div className='container container--size-s'>
          <div className='page-content__title-wrapper'>
            <h1 className='subtitle subtitle--size-l page-content__subtitle'>
              Бронирование квеста
            </h1>
            <p className='title title--size-m title--uppercase page-content__title'>
              {quest?.title}
            </p>
          </div>
          <div className='page-content__item'>
            <div className='booking-map'>
              <div className='map'>
                <GeoMap
                  center={currentBookingInfo?.location.coords}
                  points={bookingInfoList}
                  selectedPoint={currentBookingInfo}
                  onMarkerClick={handleMarkerClick}
                />
                <div className='map__container'></div>
              </div>
              <p className='booking-map__address'>
                Вы&nbsp;выбрали: {currentBookingInfo?.location.address}
              </p>
            </div>
          </div>
          <form
            className='booking-form'
            onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          >
            <fieldset className='booking-form__section'>
              <legend className='visually-hidden'>Выбор даты и времени</legend>
              <fieldset className='booking-form__date-section'>
                <legend className='booking-form__date-title'>Сегодня</legend>
                <div className='booking-form__date-inner-wrapper'>
                  {currentBookingInfo?.slots.today.map((slot) => (
                    <BookingTimeSlot
                      key={`${BookingDate.Today}-${slot.time}`}
                      bookingDate={BookingDate.Today}
                      bookingTime={slot.time}
                      isDisabled={!slot.isAvailable}
                      isChecked={
                        slot.time === chosenReservation.time &&
                        BookingDate.Today === chosenReservation.date
                      }
                      onChange={handleTimeChange}
                      register={register}
                    />
                  ))}
                </div>
              </fieldset>
              <fieldset className='booking-form__date-section'>
                <legend className='booking-form__date-title'>Завтра</legend>
                <div className='booking-form__date-inner-wrapper'>
                  {currentBookingInfo?.slots.tomorrow.map((slot) => (
                    <BookingTimeSlot
                      key={`${BookingDate.Tomorrow}-${slot.time}`}
                      bookingDate={BookingDate.Tomorrow}
                      bookingTime={slot.time}
                      isDisabled={!slot.isAvailable}
                      isChecked={
                        slot.time === chosenReservation.time &&
                        BookingDate.Tomorrow === chosenReservation.date
                      }
                      onChange={handleTimeChange}
                      register={register}
                    />
                  ))}
                  {errors.time && (
                    <span style={{ color: 'red' }}>{errors.time?.message}</span>
                  )}
                </div>
              </fieldset>
            </fieldset>
            <fieldset className='booking-form__section'>
              <legend className='visually-hidden'>Контактная информация</legend>
              <div className='custom-input booking-form__input'>
                <label
                  className='custom-input__label'
                  htmlFor='name'
                >
                  Ваше имя
                </label>
                <input
                  {...register('contactPerson', {
                    required: 'Обязательное поле',
                    minLength: {
                      value: 1,
                      message: 'Минимум 1 символ',
                    },
                    maxLength: {
                      value: 15,
                      message: 'Максимум 15 символов',
                    },
                    pattern: {
                      value: /^[a-zA-Zа-яА-ЯёЁ-]+$/,
                      message:
                        'Разрешены буквы английского и русского алфавитов',
                    },
                  })}
                  type='text'
                  id='name'
                  placeholder='Имя'
                  value={chosenReservation.contactPerson}
                  onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                    handleContactPersonChange(target)
                  }
                />
                {errors.contactPerson && (
                  <span style={{ color: 'red' }}>
                    {errors.contactPerson?.message}
                  </span>
                )}
              </div>
              <div className='custom-input booking-form__input'>
                <label
                  className='custom-input__label'
                  htmlFor='tel'
                >
                  Контактный телефон
                </label>
                <input
                  {...register('phone', {
                    required: 'Обязательное поле',
                    pattern: {
                      value: /\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/,
                      message: 'Формат номера телефона: +7 (000) 000-00-00',
                    },
                  })}
                  type='tel'
                  id='tel'
                  placeholder='Телефон'
                  value={chosenReservation.phone}
                  onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                    handlePhoneChange(target)
                  }
                />
                {errors.phone && (
                  <span style={{ color: 'red' }}>{errors.phone?.message}</span>
                )}
              </div>
              <div className='custom-input booking-form__input'>
                <label
                  className='custom-input__label'
                  htmlFor='person'
                >
                  Количество участников
                </label>
                <input
                  {...register('peopleCount', {
                    required: 'Обязательное поле',
                    min: {
                      value: quest.peopleMinMax[0],
                      message: `Минимум ${quest.peopleMinMax[0]} человек`,
                    },
                    max: {
                      value: quest.peopleMinMax[1],
                      message: `Максимум ${quest.peopleMinMax[1]} человек`,
                    },
                  })}
                  type='number'
                  id='person'
                  placeholder='Количество участников'
                  value={chosenReservation.peopleCount}
                  onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                    handleParticipantsNumberChange(target)
                  }
                />
                {errors.peopleCount && (
                  <span style={{ color: 'red' }}>
                    {errors.peopleCount?.message}
                  </span>
                )}
              </div>
              <label className='custom-checkbox booking-form__checkbox booking-form__checkbox--children'>
                <input
                  type='checkbox'
                  id='children'
                  name='children'
                  checked={chosenReservation.withChildren}
                  onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                    handleWithChildrenChange(target)
                  }
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
                  Со&nbsp;мной будут дети
                </span>
              </label>
            </fieldset>
            <button
              className='btn btn--accent btn--cta booking-form__submit'
              type='submit'
            >
              Забронировать
            </button>
            <label className='custom-checkbox booking-form__checkbox booking-form__checkbox--agreement'>
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
              <span style={{ color: 'red' }}>{errors.agreement?.message}</span>
            )}
          </form>
        </div>
      </main>
    </>
  );
}

export default BookingScreen;
