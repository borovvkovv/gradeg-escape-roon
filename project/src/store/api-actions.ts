import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute, AppRoute } from '../const';
import { saveToken, dropToken } from '../services/token';
import { BookingDataInput, BookingInfo, MyBookingInfo } from '../types/booking';
import { QuestInfo } from '../types/quest';
import { AppDispatch, State } from '../types/store';
import { AuthorizationInfo, Credentials, LocationState } from '../types/user';
import { redirectToRoute } from './action';

export const fetchQuestsAction = createAsyncThunk<
  QuestInfo[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchQuests', async (_arg, { extra: api }) => {
  const { data } = await api.get<QuestInfo[]>(ApiRoute.Quests);
  return data;
});

export const checkAuthorizationStatusAction = createAsyncThunk<
  AuthorizationInfo,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/checkAuthorizationStatus', async (_arg, { extra: api }) => {
  const { data } = await api.get<AuthorizationInfo>(ApiRoute.Login);
  return data;
});

export const endSessionAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/endSession', async (_arg, { extra: api }) => {
  try {
    await api.delete<AuthorizationInfo>(ApiRoute.Logout);
  } finally {
    dropToken();
  }
});

export const getAuthorizationStatusAction = createAsyncThunk<
  AuthorizationInfo,
  Credentials & LocationState,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/getAuthorizationStatus',
  async ({ email, password, prevPath }, { dispatch, extra: api }) => {
    const { data } = await api.post<AuthorizationInfo>(ApiRoute.Login, {
      email,
      password,
    });
    if (prevPath) {
      dispatch(redirectToRoute(prevPath));
    } else {
      dispatch(redirectToRoute(AppRoute.Root));
    }

    saveToken(data.token);

    return data;
  }
);

export const fetchQuestAction = createAsyncThunk<
  QuestInfo,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchQuest', async (questId, { extra: api }) => {
  const { data } = await api.get<QuestInfo>(
    ApiRoute.Quest.replace(':questId', String(questId))
  );

  return data;
});

export const fetchQuestBookingAction = createAsyncThunk<
  BookingInfo[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchQuestBooking', async (questId, { extra: api }) => {
  const { data } = await api.get<BookingInfo[]>(
    ApiRoute.QuestBooking.replace(':questId', questId)
  );

  return data;
});

export const bookQuestAction = createAsyncThunk<
  MyBookingInfo,
  {
    bookingDataInput: BookingDataInput;
    questId: string;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/bookQuest',
  async ({ bookingDataInput, questId }, { dispatch, extra: api }) => {
    const { data } = await api.post<MyBookingInfo>(
      ApiRoute.QuestBooking.replace(':questId', questId),
      {
        ...bookingDataInput,
      }
    );
    dispatch(redirectToRoute(AppRoute.MyBookings));

    return data;
  }
);

export const fetchMyQuestBookingsAction = createAsyncThunk<
  MyBookingInfo[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchMyQuestBookings', async (_arg, { extra: api }) => {
  const { data } = await api.get<MyBookingInfo[]>(ApiRoute.UserQuestBooking);

  return data;
});

export const deleteMyQuestBookingAction = createAsyncThunk<
  string,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/deleteMyQuestBooking', async (reservationId, { extra: api }) => {
  await api.delete<MyBookingInfo[]>(
    ApiRoute.RemovingUserQuestBooking.replace(
      ':reservationId',
      reservationId
    )
  );

  return reservationId;
});
