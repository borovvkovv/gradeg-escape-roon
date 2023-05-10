import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FilterType,
  NameSpace,
  QuestGenreFilterType,
  QuestLevelFilterType,
} from '../../const';
import { FilterByType } from '../../types/filter';
import { AppProcess } from '../../types/store';

const initialState: AppProcess = {
  filter: {
    [FilterType.Genre]: QuestGenreFilterType.all,
    [FilterType.Level]: QuestLevelFilterType.any,
  },
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterByType>) => {
      state.filter = action.payload;
    },
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(sendCommentAction.rejected, (state, action) => {
  //       state.error = action.error.message ?? 'something went wrong';
  //     });
  // },
});

export const { setFilter } = appProcess.actions;
