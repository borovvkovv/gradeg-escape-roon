import { FilterType, QuestGenreFilterType, QuestLevelFilterType } from '../const';

export type QuestLevelFilter = {
  title: string;
  id: QuestLevelFilterType;
};

export type QuestGenreFilter = {
  title: string;
  id: QuestGenreFilterType;
  iconUrlPart: string;
  iconWidth: number;
  iconHeight: number;
};

export type QuestsByFilter = {
  [FilterType.Genre]: QuestGenreFilter[];
  [FilterType.Level]: QuestLevelFilter[];
};

export type FilterByType = {
  [FilterType.Genre]: QuestGenreFilterType;
  [FilterType.Level]: QuestLevelFilterType;
};
