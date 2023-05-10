import { useEffect } from 'react';
import Header from '../../components/header/header';
import MyBookingCard from '../../components/my-booking-card/my-booking-card';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
  deleteMyQuestBookingAction,
  fetchMyQuestBookingsAction,
} from '../../store/api-actions';
import {
  getIsMyBookingsLoading,
  getMyBookings,
} from '../../store/data-process/selectors';
import LoadingScreen from '../loading-screen/loading-screen';

function MyBookingsScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMyQuestBookingsAction());
  }, [dispatch]);

  const myBookings = useAppSelector(getMyBookings);
  const isMyBookingLoading = useAppSelector(getIsMyBookingsLoading);

  if (isMyBookingLoading) {
    return <LoadingScreen />;
  }

  function handleMyBookingClick(id: string) {
    dispatch(deleteMyQuestBookingAction(id));
  }

  return (
    <>
      <Header currentPage={AppRoute.MyBookings} />
      <main className='page-content decorated-page'>
        <div
          className='decorated-page__decor'
          aria-hidden='true'
        >
          <picture>
            <source
              type='image/webp'
              srcSet='img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x'
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
        <div className='container'>
          <div className='page-content__title-wrapper'>
            <h1 className='title title--size-m page-content__title'>
              Мои бронирования
            </h1>
          </div>
          <div className='cards-grid'>
            {myBookings.length <= 0 ? (
              <p>У Вас нет заказов.</p>
            ) : (
              myBookings.map((booking) => (
                <MyBookingCard
                  key={booking.id}
                  myBookingInfo={booking}
                  onClick={handleMyBookingClick}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default MyBookingsScreen;
