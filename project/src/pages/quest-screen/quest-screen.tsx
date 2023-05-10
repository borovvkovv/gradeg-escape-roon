import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import { AppRoute, QuestGenreTitleMap, QuestLevelTitleMap } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import useGetQuest from '../../hooks/use-get-quest';
import { getIsQuestLoading } from '../../store/data-process/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundSreen from '../not-found-screen/not-found-screen';

function QuestScreen(): JSX.Element {
  const { idAsString, quest } = useGetQuest();

  const isQuestLoading = useAppSelector(getIsQuestLoading);

  if (!idAsString) {
    return <NotFoundSreen />;
  }

  if (isQuestLoading) {
    return <LoadingScreen />;
  }

  if (!quest) {
    return <NotFoundSreen />;
  }

  const {
    id,
    title,
    level,
    type,
    peopleMinMax,
    description,
    coverImg,
    coverImgWebp,
  } = quest;

  const [minPeople, maxPeople] = peopleMinMax;

  return (
    <>
      <Header currentPage={AppRoute.Quest} />
      <main className='decorated-page quest-page'>
        <div
          className='decorated-page__decor'
          aria-hidden='true'
        >
          <picture>
            <source
              type='image/webp'
              srcSet={`${coverImgWebp}, ${coverImgWebp} 2x`}
            />
            <img
              src={coverImg}
              srcSet={`${coverImg} 2x`}
              width='1366'
              height='768'
              alt=''
            />
          </picture>
        </div>
        <div className='container container--size-l'>
          <div className='quest-page__content'>
            <h1 className='title title--size-l title--uppercase quest-page__title'>
              {title}
            </h1>
            <p className='subtitle quest-page__subtitle'>
              <span className='visually-hidden'>Жанр:</span>
              {QuestGenreTitleMap[type]}
            </p>
            <ul className='tags tags--size-l quest-page__tags'>
              <li className='tags__item'>
                <svg
                  width='11'
                  height='14'
                  aria-hidden='true'
                >
                  <use xlinkHref='#icon-person'></use>
                </svg>
                {minPeople}&ndash;{maxPeople}&nbsp;чел
              </li>
              <li className='tags__item'>
                <svg
                  width='14'
                  height='14'
                  aria-hidden='true'
                >
                  <use xlinkHref='#icon-level'></use>
                </svg>
                {QuestLevelTitleMap[level]}
              </li>
            </ul>
            <p className='quest-page__description'>{description}</p>
            <Link
              className='btn btn--accent btn--cta quest-page__btn'
              to={AppRoute.Booking.replace(':questId', id)}
            >
              Забронировать
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default QuestScreen;
