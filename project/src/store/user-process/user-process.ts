import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcess } from '../../types/store';
import { checkAuthorizationStatusAction, endSessionAction, getAuthorizationStatusAction } from '../api-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationInfo: undefined,
  isCheckingAuthorizationStatus: false,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthorizationStatusAction.pending, (state) => {
        state.isCheckingAuthorizationStatus = true;
      })
      .addCase(checkAuthorizationStatusAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authorizationInfo = action.payload;
        state.isCheckingAuthorizationStatus = false;
      })
      .addCase(checkAuthorizationStatusAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authorizationInfo = undefined;
        state.isCheckingAuthorizationStatus = false;
      })
      .addCase(endSessionAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authorizationInfo = undefined;
      })
      .addCase(endSessionAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authorizationInfo = undefined;
      })
      .addCase(getAuthorizationStatusAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authorizationInfo = action.payload;
      });
  }
});
