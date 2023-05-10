import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { QuestInfo } from '../../types/quest';
import { DataProcess } from '../../types/store';
import { deleteMyQuestBookingAction, fetchMyQuestBookingsAction, fetchQuestAction, fetchQuestBookingAction, fetchQuestsAction } from '../api-actions';

const initialState: DataProcess = {
  quests: [],
  quest: null,
  isQuestsLoading: true,
  isQuestLoading: true,
  bookingInfoList: [],
  isBookingInfoLoading: false,
  myBookings: [],
  isMyBookingsLoading: false,
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
      .addCase(fetchQuestBookingAction.pending, (state) => {
        state.bookingInfoList = [];
        state.isBookingInfoLoading = true;
      })
      .addCase(fetchQuestBookingAction.fulfilled, (state, action) => {
        state.bookingInfoList = action.payload;
        state.isBookingInfoLoading = false;
      })
      .addCase(fetchQuestBookingAction.rejected, (state) => {
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
      });
    //     .addCase(sendCommentAction.pending, (state) => {
    //       state.isCommentSending = true;
    //       state.isCommentSent = false;
    //     })
    //     .addCase(
    //       sendCommentAction.fulfilled,
    //       (state, action: PayloadAction<Review[]>) => {
    //         state.comments = action.payload;
    //         state.isCommentSent = true;
    //         state.isCommentSending = false;
    //       }
    //     )
    //     .addCase(sendCommentAction.rejected, (state) => {
    //       state.isCommentSending = false;
    //     })
    //     .addCase(fetchRoomAction.pending, (state) => {
    //       state.isOfferDataLoading = true;
    //     })
    //     .addCase(fetchRoomAction.fulfilled, (state, action) => {
    //       state.isOfferDataLoading = false;

    //       const [offer, reviews, nearbyOffers] = action.payload;
    //       state.offer = offer;
    //       state.comments = reviews;
    //       state.nearbyOffers = nearbyOffers;
    //     })
    //     .addCase(fetchRoomAction.rejected, (state) => {
    //       state.isOfferDataLoading = false;
    //     });
  },
});

export const { loadQuests, loadQuest } = dataProcess.actions;
