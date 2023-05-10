import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { BookingInfo, MyBookingInfo } from './booking';
import { FilterByType } from './filter';
import { QuestInfo } from './quest';
import { AuthorizationInfo } from './user';

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  authorizationInfo: AuthorizationInfo | undefined;
  isCheckingAuthorizationStatus: boolean;
};

export type DataProcess = {
  quests: QuestInfo[];
  quest: QuestInfo | null;
  isQuestsLoading: boolean;
  isQuestLoading: boolean;
  bookingInfoList: BookingInfo[];
  isBookingInfoLoading: boolean;
  myBookings: MyBookingInfo[];
  isMyBookingsLoading: boolean;
  isBookingQuestSending: boolean;
};

export type AppProcess = {
  filter: FilterByType;
};

export type State = ReturnType<typeof store.getState>;
