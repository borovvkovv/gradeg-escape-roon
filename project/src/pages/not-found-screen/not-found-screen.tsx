import Header from '../../components/header/header';
import { AppRoute } from '../../const';

export default function NotFoundSreen(): JSX.Element {
  return (
    <>
      <Header currentPage={AppRoute.Any} />
      <main className='page-content'>
        <div className='container'>
          <h2>Ничего не найдено</h2>
        </div>
      </main>
    </>
  );
}
