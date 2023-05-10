import { combineReducers } from 'redux';
import { NameSpace } from '../const';
import { appProcess } from './app-process/app-process';
import { dataProcess } from './data-process/data-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Data]: dataProcess.reducer,
});
