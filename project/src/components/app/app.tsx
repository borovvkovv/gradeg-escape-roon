import { Route, Routes } from 'react-router';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import BookingScreen from '../../pages/booking-screen/booking-screen';
import ContactsScreen from '../../pages/contacts-screen/contacts-screen';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MyBookingsScreen from '../../pages/my-bookings-screen/my-bookings-screen';
import NotFoundSreen from '../../pages/not-found-screen/not-found-screen';
import QuestScreen from '../../pages/quest-screen/quest-screen';
import { getAuthorizationStatus, getIsCheckingAuthorizationStatus } from '../../store/user-process/selectors';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {

  const authStatus = useAppSelector(getAuthorizationStatus);
  const isCheckingAuthorizationStatus = useAppSelector(
    getIsCheckingAuthorizationStatus
  );

  if (isCheckingAuthorizationStatus) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path={AppRoute.Root}>
        <Route
          index
          element={<MainScreen />}
        />
        <Route
          path={AppRoute.Quest}
          element={<QuestScreen />}
        />
        <Route
          path={AppRoute.Contacts}
          element={<ContactsScreen />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Booking}
          element={
            <PrivateRoute authorizationStatus={authStatus}>
              <BookingScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.MyBookings}
          element={
            <PrivateRoute authorizationStatus={authStatus}>
              <MyBookingsScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Any}
          element={<NotFoundSreen />}
        />
      </Route>
    </Routes>
  );
}

export default App;
