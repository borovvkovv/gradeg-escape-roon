import { FilterType, QuestGenreFilterType, QuestLevelFilterType } from '../../const';
import { QuestGenreFilter, QuestLevelFilter } from '../../types/filter';

type FilterItemProps = {
  filter: QuestLevelFilter | QuestGenreFilter;
  currentFilterId: QuestGenreFilterType | QuestLevelFilterType;
  filterType: FilterType;
  onClick: (value: QuestGenreFilterType | QuestLevelFilterType) => void;
};

function FilterItem({ filter, currentFilterId, filterType, onClick }: FilterItemProps): JSX.Element {
  return (
    <li className='filter__item'>
      <input
        type='radio'
        name={filterType}
        id={filter.id}
        checked={filter.id === currentFilterId}
        onChange={() => onClick(filter.id)}
      />
      <label
        className='filter__label'
        htmlFor={filter.id}
      >
        {(filter as QuestGenreFilter).iconUrlPart && (
          <svg
            className='filter__icon'
            width={(filter as QuestGenreFilter).iconWidth}
            height={(filter as QuestGenreFilter).iconHeight}
            aria-hidden='true'
          >
            <use
              xlinkHref={`#icon-${(filter as QuestGenreFilter).iconUrlPart}`}
            >
            </use>
          </svg>
        )}
        <span className='filter__label-text'>{filter.title}</span>
      </label>
    </li>
  );
}

export default FilterItem;
