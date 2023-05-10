import { QuestsByFilter } from './types/filter';
import { QuestInfo } from './types/quest';

export enum AppRoute {
  Root = '/',
  Quest = '/quest/:questId',
  Login = '/login',
  Booking = '/quest/:questId/booking',
  MyBookings = '/my-quests',
  Contacts = '/contacts',
  Any = '*',
}

export enum ApiRoute {
  Quests = '/quest',
  Quest = '/quest/:questId',
  QuestBooking = '/quest/:questId/booking',
  UserQuestBooking = '/reservation',
  RemovingUserQuestBooking = '/reservation/:reservationId',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
  App = 'APP'
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export enum FilterType {
  Genre = 'type',
  Level = 'level',
}

export enum QuestLevel {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}


export enum QuestGenre {
  Adventure = 'adventures',
  Horror= 'horror',
  Mystic= 'mystic',
  Detective = 'detective',
  SciFi = 'sci-fi',
}

export enum QuestGenreFilterType {
  Adventure = 'adventure',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi = 'sciFi',
  all = 'all',
}

export enum QuestLevelFilterType {
  Easy = 'easy',
  Medium = 'middle',
  Hard = 'hard',
  any = 'any',
}

export const QuestGenreFilterCallbackMap = {
  [QuestGenreFilterType.Adventure]: (quest: QuestInfo) =>
    quest.type === QuestGenre.Adventure,

  [QuestGenreFilterType.Horror]: (quest: QuestInfo) =>
    quest.type === QuestGenre.Horror,

  [QuestGenreFilterType.Mystic]: (quest: QuestInfo) =>
    quest.type === QuestGenre.Mystic,

  [QuestGenreFilterType.Detective]: (quest: QuestInfo) =>
    quest.type === QuestGenre.Detective,

  [QuestGenreFilterType.SciFi]: (quest: QuestInfo) =>
    quest.type === QuestGenre.SciFi,

  [QuestGenreFilterType.all]: (quest: QuestInfo) => true,
} as const;

export const QuestLevelFilterCallbackMap = {
  [QuestLevelFilterType.Easy]: (quest: QuestInfo) =>
    quest.level === QuestLevel.Easy,

  [QuestLevelFilterType.Medium]: (quest: QuestInfo) =>
    quest.level === QuestLevel.Medium,

  [QuestLevelFilterType.Hard]: (quest: QuestInfo) =>
    quest.level === QuestLevel.Hard,

  [QuestLevelFilterType.any]: (quest: QuestInfo) => true,
} as const;

export const QuestGenreTitleMap = {
  [QuestGenre.Adventure]: 'Приключения',
  [QuestGenre.Horror]: 'Ужасы',
  [QuestGenre.Mystic]: 'Мистика',
  [QuestGenre.Detective]: 'Детектив',
  [QuestGenre.SciFi]: 'Sci-fi',
} as const;

export const QuestLevelTitleMap = {
  [QuestLevel.Easy]: 'Лёгкий',
  [QuestLevel.Medium]: 'Средний',
  [QuestLevel.Hard]: 'Сложный',
} as const;

export const TypesWithFilters: QuestsByFilter = {
  [FilterType.Genre]: [
    {
      title: 'Все квесты',
      id: QuestGenreFilterType.all,
      iconUrlPart: 'all-quests',
      iconWidth: 26,
      iconHeight: 30,
    },
    {
      title: 'Приключения',
      id: QuestGenreFilterType.Adventure,
      iconUrlPart: 'adventure',
      iconWidth: 36,
      iconHeight: 30,
    },
    {
      title: 'Ужасы',
      id: QuestGenreFilterType.Horror,
      iconUrlPart: 'horror',
      iconWidth: 30,
      iconHeight: 30,
    },
    {
      title: 'Мистика',
      id: QuestGenreFilterType.Mystic,
      iconUrlPart: 'mystic',
      iconWidth: 30,
      iconHeight: 30,
    },
    {
      title: 'Детектив',
      id: QuestGenreFilterType.Detective,
      iconUrlPart: 'detective',
      iconWidth: 40,
      iconHeight: 30,
    },
    {
      title: 'Sci-fi',
      id: QuestGenreFilterType.SciFi,
      iconUrlPart: 'sci-fi',
      iconWidth: 28,
      iconHeight: 30,
    },
  ],
  [FilterType.Level]: [
    {
      title: 'Любой',
      id: QuestLevelFilterType.any,
    },
    {
      title: 'Лёгкий',
      id: QuestLevelFilterType.Easy,
    },
    {
      title: 'Средний',
      id: QuestLevelFilterType.Medium,
    },
    {
      title: 'Сложный',
      id: QuestLevelFilterType.Hard,
    },
  ],
};

export enum BookingDate {
  Today = 'today',
  Tomorrow = 'tomorrow',
}

export const BookingDateTitleMap = {
  [BookingDate.Today]: 'сегодня',
  [BookingDate.Tomorrow]: 'завтра',
};
