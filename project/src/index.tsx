import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import { store } from './store';
import {
  checkAuthorizationStatusAction,
  fetchQuestsAction,
} from './store/api-actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import browserHistory from './browser-history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuthorizationStatusAction());
store.dispatch(fetchQuestsAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
