import {
  TypesWithFilters,
  FilterType,
  QuestGenreFilterType,
  QuestLevelFilterType,
} from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { setFilter } from '../../store/app-process/app-process';
import { getFilter } from '../../store/app-process/selectors';
import FilterItem from '../filter-item/filter-item';

type FiltersListProps = {
  filterType: FilterType;
};

function FiltersList({ filterType }: FiltersListProps): JSX.Element {
  const currentFilter = useAppSelector(getFilter);
  const dispatch = useAppDispatch();

  function handleFilterItemCick(
    value: QuestGenreFilterType | QuestLevelFilterType
  ) {
    if (filterType === FilterType.Genre) {
      dispatch(
        setFilter({
          ...currentFilter,
          [FilterType.Genre]: value as QuestGenreFilterType,
        })
      );
    } else {
      dispatch(
        setFilter({
          ...currentFilter,
          [FilterType.Level]: value as QuestLevelFilterType,
        })
      );
    }
  }

  return (
    <ul className='filter__list'>
      {TypesWithFilters[filterType].map((filter) => (
        <FilterItem
          key={filter.id}
          filter={filter}
          currentFilterId={currentFilter[filterType]}
          filterType={filterType}
          onClick={handleFilterItemCick}
        />
      ))}
    </ul>
  );
}

export default FiltersList;
