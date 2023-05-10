import { Navigate } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authorizationStatus, children } = props;

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate
      to={AppRoute.Login}
      state={{ prevPath: browserHistory.location.pathname }}
    />
  );
}

export default PrivateRoute;
