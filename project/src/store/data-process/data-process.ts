import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { QuestInfo } from '../../types/quest';
import { DataProcess } from '../../types/store';
import { bookQuestAction, deleteMyQuestBookingAction, fetchMyQuestBookingsAction, fetchQuestAction, fetchQuestBookingListAction, fetchQuestsAction } from '../api-actions';

const initialState: DataProcess = {
  quests: [],
  quest: null,
  isQuestsLoading: true,
  isQuestLoading: true,
  bookingInfoList: [],
  isBookingInfoLoading: false,
  myBookings: [],
  isMyBookingsLoading: false,
  isBookingQuestSending: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadQuests: (state, action: PayloadAction<QuestInfo[]>) => {
      state.quests = action.payload;
    },
    loadQuest: (state, action: PayloadAction<QuestInfo>) => {
      state.quest = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.pending, (state) => {
        state.isQuestsLoading = true;
      })
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.isQuestsLoading = false;
        state.quests = action.payload;
      })
      .addCase(fetchQuestsAction.rejected, (state) => {
        state.isQuestsLoading = false;
      })
      .addCase(fetchQuestAction.pending, (state) => {
        state.isQuestLoading = true;
      })
      .addCase(fetchQuestAction.fulfilled, (state, action) => {
        state.isQuestLoading = false;
        state.quest = action.payload;
      })
      .addCase(fetchQuestAction.rejected, (state) => {
        state.isQuestLoading = false;
      })
      .addCase(fetchQuestBookingListAction.pending, (state) => {
        state.bookingInfoList = [];
        state.isBookingInfoLoading = true;
      })
      .addCase(fetchQuestBookingListAction.fulfilled, (state, action) => {
        state.bookingInfoList = action.payload;
        state.isBookingInfoLoading = false;
      })
      .addCase(fetchQuestBookingListAction.rejected, (state) => {
        state.isBookingInfoLoading = false;
      })
      .addCase(fetchMyQuestBookingsAction.pending, (state) => {
        state.isMyBookingsLoading = true;
      })
      .addCase(fetchMyQuestBookingsAction.fulfilled, (state, action) => {
        state.isMyBookingsLoading = false;
        state.myBookings = action.payload;
      })
      .addCase(fetchMyQuestBookingsAction.rejected, (state) => {
        state.isMyBookingsLoading = false;
      })
      .addCase(deleteMyQuestBookingAction.fulfilled, (state, action) => {
        const bookingIndexToDelete = state.myBookings.findIndex(
          (booking) => booking.id === action.payload
        );
        state.myBookings.splice(bookingIndexToDelete, 1);
      })
      .addCase(bookQuestAction.pending, (state) => {
        state.isBookingQuestSending = true;
      })
      .addCase(bookQuestAction.fulfilled, (state, action) => {
        state.isBookingQuestSending = false;
      })
      .addCase(bookQuestAction.rejected, (state) => {
        state.isBookingQuestSending = false;
      });
  },
});

export const { loadQuests, loadQuest } = dataProcess.actions;
