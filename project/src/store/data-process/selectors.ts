import { NameSpace } from '../../const';
import { State } from '../../types/store';

export const getQuests = (state: State) => state[NameSpace.Data].quests;
export const getQuest = (state: State) => state[NameSpace.Data].quest;
export const getIsQuestsLoading = (state: State) =>
  state[NameSpace.Data].isQuestsLoading;
export const getIsQuestLoading = (state: State) =>
  state[NameSpace.Data].isQuestLoading;
export const getBookingInfoList = (state: State) =>
  state[NameSpace.Data].bookingInfoList;
export const getIsBookingInfoLoading = (state: State) =>
  state[NameSpace.Data].isBookingInfoLoading;
export const getMyBookings = (state: State) => state[NameSpace.Data].myBookings;
export const getIsMyBookingsLoading = (state: State) =>
  state[NameSpace.Data].isMyBookingsLoading;
export const getIsBookingQuestSending = (state: State) =>
  state[NameSpace.Data].isBookingQuestSending;
