import { useMemo } from 'react';
import FiltersList from '../../components/filters-list/filters-list';
import Header from '../../components/header/header';
import NoQuestsAvailable from '../../components/no-quests-available/no-quests-available';
import QuestCardsList from '../../components/quest-cards-list/quest-cards-list';
import { AppRoute, FilterType, QuestGenreFilterCallbackMap, QuestLevelFilterCallbackMap } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getFilter } from '../../store/app-process/selectors';
import { getIsQuestsLoading, getQuests } from '../../store/data-process/selectors';
import LoadingScreen from '../loading-screen/loading-screen';

function MainScreen(): JSX.Element {

  const allQuests = useAppSelector(getQuests);
  const isQuestsLoading = useAppSelector(getIsQuestsLoading);
  const filter = useAppSelector(getFilter);

  const quests = useMemo(
    () =>
      allQuests
        .filter(QuestGenreFilterCallbackMap[filter.type])
        .filter(QuestLevelFilterCallbackMap[filter.level]),
    [allQuests, filter]
  );

  const isEmptyQuests = !quests.length;

  if (isQuestsLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Header currentPage={AppRoute.Root} />
      <main className='page-content'>
        <div className='container'>
          <div className='page-content__title-wrapper'>
            <h1 className='subtitle page-content__subtitle'>
              квесты в Санкт-Петербурге
            </h1>
            <h2 className='title title--size-m page-content__title'>
              Выберите тематику
            </h2>
          </div>
          <div className='page-content__item'>
            <form className='filter'>
              <fieldset className='filter__section'>
                <legend className='visually-hidden'>Тематика</legend>
                <FiltersList filterType={FilterType.Genre} />
              </fieldset>
              <fieldset className='filter__section'>
                <legend className='visually-hidden'>Сложность</legend>
                <FiltersList filterType={FilterType.Level} />
              </fieldset>
            </form>
          </div>
          <h2 className='title visually-hidden'>Выберите квест</h2>
          {isEmptyQuests ? <NoQuestsAvailable /> : <QuestCardsList quests={quests} />}
        </div>
      </main>
    </>
  );
}

export default MainScreen;
